import React from "react";
import {HorarioProps, HorarioState} from "routes/horario/types";
import {horarioReducer, initialState} from "routes/horario/reducers";
import {withRouter} from "react-router-dom";
import {cambiarCargando, CONNECTOR, fijarFestivos, fijarMatricula, nuevoEvento} from "routes/horario/actions";
import AppRoutes from "routes/index";
import {generarAsignaturas, guardarMatricula} from "utils/share";
import {Col, Layout, Row, Spin} from "antd";
import FullCalendar, {EventInput} from "@fullcalendar/react";
import esLocale from '@fullcalendar/core/locales/es';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import rrulePlugin from '@fullcalendar/rrule';
import {parsearFestivos} from "utils/spreadsheet-json";
import {request} from "utils/http";
import {BD} from "config";
import {diasSemana} from "models/enums";
import Asignatura from "models/asignatura";
import {Festivo} from "models/festivo";
import moment from "moment";
import "./horario.less";
import {colores} from "utils/colors";

class Horario extends React.Component<HorarioProps, HorarioState> {
  constructor(props: HorarioProps) {
    super(props);
    this.state = initialState;

    this.generarEventos = this.generarEventos.bind(this);
  }

  componentDidMount() {
    let path = this.props.location.pathname;
    if (path.startsWith("/")) {
      path = path.substring(1);
    }

    let parts = path.split("/");
    if (parts.length !== 2) {
      this.props.history.replace(AppRoutes.AJUSTES);
      return;
    }

    let state = this.state;
    // Generar las matrículas seleccionadas
    generarAsignaturas(parts[1]).then(matricula => {
      state = horarioReducer(state, fijarMatricula(matricula));

      // Descargar todos los festivos globales
      request(BD.FESTIVOS, `SELECT * WHERE ${BD.FESTIVOS__ASIGNATURA}='-'`).then(json => {
        state = horarioReducer(state, fijarFestivos(parsearFestivos(json)));
        this.generarEventos(state.matricula, state.festivos)
          .forEach(e => state = horarioReducer(state, nuevoEvento(e)));
        state = horarioReducer(state, cambiarCargando());
        this.setState(state, () => guardarMatricula(state.matricula));
      });
    });
  }

  private generarEventos(asignaturas: Asignatura[], festivos: Festivo[]): EventInput[] {
    let eventos: any[] = [];

    asignaturas.forEach((asignatura, key) => {
      let color = colores[asignatura.periodo][key % colores[asignatura.periodo].length];

      asignatura.clases.forEach(clase => {
        clase.periodos.forEach(periodo => {
          // TODO(diego@kodular.io): Posibilidad de hacer más de dos rotaciones
          let rotaciones: string[] = clase.grupos[0].rotacion ? ["A", "B"] : ["A"];
          rotaciones.forEach((rotacion, key) => {
            // Si no hay rotación, nunca es telemático
            let aula = !clase.grupos[0].rotacion || rotacion === clase.grupos[0].rotacion ? clase.aula : "T";

            eventos.push({
              id: (Math.random() + 1).toString(36).substring(2),
              title: `${clase.aula ? `[${aula}]` : ``} ${asignatura.abreviatura}`,
              rrule: {
                freq: 'weekly',
                interval: rotaciones.length,
                byweekday: [diasSemana.indexOf(clase.dia)],
                dtstart: moment(periodo.inicio || "", "MM/DD/YYYY")
                    // Insertar tantas semanas como clave
                    .add(key, 'weeks')
                    .format('YYYY-MM-DD')
                  // Es necesario reparsear las horas, ya que 9:00 debe ser 09:00.
                  + "T" + moment(clase.inicio, "HH:mm").format("HH:mm"),
                until: moment(periodo.fin || "", "MM/DD/YYYY").add(1, 'day').format('YYYY-MM-DD')
              },
              duration: moment.utc(moment(clase.fin, "HH:mm").diff(moment(clase.inicio, "HH:mm"))).format("HH:mm"),
              exdate: [
                ...festivos.map(f => moment(f.dia, "MM/DD/YYYY").format("YYYY-MM-DD")),
                ...clase.festivos.map(f => moment(f.dia, "MM/DD/YYYY").format("YYYY-MM-DD")),
              ],
              color: color[clase.tipo],
              extendedProps: {
                asignatura: asignatura,
                clase: clase,
                periodo: periodo,
                grupo: clase.grupos[0],
                rotacion: rotacion
              }
            });
          });
        });
      });
    });

    return eventos;
  }

  render() {
    return (
      <Layout.Content>
        <Row justify="space-between">
          <Col span={24}>
            <Spin tip="Cargando..." spinning={this.state.cargando} className={'fc'}>
              <FullCalendar
                viewClassNames={'fc'}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'Agenda,Semana,Mes'
                }}
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, rrulePlugin]}
                initialView={window.innerWidth <= 768 ? "Agenda" : "Semana"}
                locale={esLocale}
                firstDay={1}
                timeZone={"local"}
                nowIndicator={true}
                views={{
                  Agenda: {type: 'listWeek', duration: {days: 10}},
                  Semana: {type: 'timeGridWeek', weekends: false, allDaySlot: false},
                  Mes: {type: 'dayGridMonth'}
                }}
                businessHours={[
                  {daysOfWeek: [1, 2, 3, 4, 5], startTime: '09:00', endTime: '14:30'},
                  {daysOfWeek: [1, 2, 3, 4, 5], startTime: '15:00', endTime: '20:30'}
                ]}
                events={this.state.eventos}

                eventDidMount={(info) => {
                  /* let eventTooltip = document.createElement("div");
                  eventTooltip.id = info.event.id;
                  info.el.appendChild(eventTooltip);

                  info.el.classList.add('contenedor-evento')
                  for (let i = 0; i < info.el.children.length; i++) {
                    info.el.children[i].classList.add('componente-evento');
                  }

                  let popover = <Popover
                    title={info.event.extendedProps.asignatura.nombre}
                    content={<Descriptions bordered size={"small"} layout={"vertical"} column={3}>
                      <Descriptions.Item label={"Tipo"} span={2}>
                        {info.event.extendedProps.clase.tipo}
                      </Descriptions.Item>
                      <Descriptions.Item label={"Aula"}>
                        {info.event.extendedProps.clase.aula}
                      </Descriptions.Item>

                      <Descriptions.Item label={"Grupo"}>
                        {info.event.extendedProps.clase.grupo}
                      </Descriptions.Item>
                      <Descriptions.Item label={"Rotacion"}>
                        {info.event.extendedProps.grupo.rotacion}
                      </Descriptions.Item>
                      <Descriptions.Item label={"Presencial"}>
                        {(info.event.extendedProps.rotacion || info.event.extendedProps.grupo.rotacion) === info.event.extendedProps.grupo.rotacion ? "Si" : "No"}
                      </Descriptions.Item>
                    </Descriptions>}
                  >
                    <div className={'componente-evento'}/>
                  </Popover>;

                  ReactDOM.render(popover, document.getElementById(eventTooltip.id)); */
                }}
              />
            </Spin>
          </Col>
        </Row>
      </Layout.Content>
    );
  }
}

export default CONNECTOR(withRouter(Horario));
