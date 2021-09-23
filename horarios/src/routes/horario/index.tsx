import React from "react";
import {HorarioProps, HorarioState} from "routes/horario/types";
import {initialState} from "routes/horario/reducers";
import {withRouter} from "react-router-dom";
import {CONNECTOR} from "routes/horario/actions";
import AppRoutes from "routes/index";
import {generarAsignaturas} from "utils/share";
import {Col, Layout, Row} from "antd";
import FullCalendar from "@fullcalendar/react";
import esLocale from '@fullcalendar/core/locales/es';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';

class Horario extends React.Component<HorarioProps, HorarioState> {
  constructor(props: HorarioProps) {
    super(props);
    this.state = initialState;
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

    let matricula = generarAsignaturas(parts[1]);
    matricula.then(console.log);
  }

  render() {
    return (
      <Layout.Content>
        <Row justify="space-between">
          <Col span={24}>
            <FullCalendar
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'Agenda,Semana,Mes'
              }}
              plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
              initialView={"Agenda"}
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
            />
          </Col>
        </Row>
      </Layout.Content>
    );
  }
}

export default CONNECTOR(withRouter(Horario));
