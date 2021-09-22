import React from "react";
import {AjustesProps, AjustesState} from "./types";
import {
  cambiarApellidos,
  cambiarCargando,
  cambiarVisibilidadSelectorAsignaturas,
  CONNECTOR,
  matricular,
  nuevaAsignatura,
  nuevaClase,
  nuevoGrupo,
  reasignarGrupos
} from "./actions";
import {withRouter} from "react-router-dom";
import {ajustesReducer, initialState} from "routes/ajustes/reducers";
import {Button, Col, Input, Layout, Popconfirm, Row} from "antd";
import {request} from "utils/http";
import {BD} from "config";
import {parsearAsignaturas, parsearClases, parsearGrupos} from "utils/spreadsheet-json";
import SelectorAsignaturas from "components/selector-asignaturas";
import {hayDatosGuardados} from "utils/share";
import Asignatura from "models/asignatura";
import TablaAsignaturas from "components/tabla-asignaturas";
import {tiposClase} from "models/enums";
import assert from "assert";


class Ajustes extends React.Component<AjustesProps, AjustesState> {
  constructor(props: AjustesProps) {
    super(props);
    this.state = initialState;

    this.guardarAsignaturasSeleccionadas = this.guardarAsignaturasSeleccionadas.bind(this);
    this.autoasignarGrupos = this.autoasignarGrupos.bind(this);
  }

  private guardarAsignaturasSeleccionadas(asignaturas: Asignatura[]) {
    let state = this.state;
    state = ajustesReducer(state, matricular(asignaturas));
    this.setState(state);
  }

  private autoasignarGrupos() {
    this.state.matricula.forEach(asignatura => {
      asignatura.clases = [];
      let asignaturaOriginal = this.state.asignaturas.find(a => a.abreviatura === asignatura.abreviatura);

      tiposClase.forEach(tipo => {
        assert(asignaturaOriginal !== undefined);
        let clases = asignaturaOriginal.clases.filter(c => c.tipo === tipo);
        let numGrupos: number[] = [];
        clases.forEach(clase => {
          if (numGrupos.indexOf(clase.grupo) === -1) numGrupos.push(clase.grupo);
        });

        if (numGrupos.length === 1) {
          clases.forEach(clase => asignatura.clases.push(clase));
        } else {
          // TODO
        }
      });
    });
  }

  componentDidMount() {
    let state = this.state;
    request(BD.ASIGNATURAS).then(json => {
      parsearAsignaturas(json).forEach(asignatura => {
        state = ajustesReducer(state, nuevaAsignatura(asignatura));
      });

      request(BD.CLASES).then(json => {
        parsearClases(json).forEach(clase => {
          state = ajustesReducer(state, nuevaClase(clase));
        });

        request(BD.GRUPOS).then(json => {
          parsearGrupos(json).forEach(grupo => {
            state = ajustesReducer(state, nuevoGrupo(grupo));
          });

          state = ajustesReducer(state, reasignarGrupos());
          state = ajustesReducer(state, cambiarCargando());
          if (hayDatosGuardados()) {
            // TODO(diego@kodular.io): Actualizar matrícula
          } else {
            state = ajustesReducer(state, cambiarVisibilidadSelectorAsignaturas());
          }

          this.setState(state);
        });
      });
    });
  }

  render() {
    return (
      <Layout.Content>
        <Row justify="space-between">
          <Col xs={24} sm={24} md={24} lg={8} xl={8}>
            <Button
              className="max-width"
              type="default" size="large"
              onClick={() => this.setState(ajustesReducer(this.state, cambiarVisibilidadSelectorAsignaturas()))}
              loading={this.state.cargando} disabled={this.state.cargando}
            >
              {this.state.matricula.length} Asignatura{this.state.matricula.length !== 1 ? "s" : ""}
            </Button>
          </Col>
          <Col xs={24} sm={24} md={24} lg={15} xl={15}>
            <Row justify="space-between">
              <Col xs={24} sm={12} md={12} lg={15} xl={15}>
                <Input
                  placeholder="Apellidos..." allowClear size="large"
                  onChange={e => this.setState(ajustesReducer(this.state, cambiarApellidos(e.target.value)))}
                  value={this.state.apellidos}
                  disabled={this.state.cargando}
                />
              </Col>
              <Popconfirm
                placement="bottomRight"
                title={"Se reasignarán todos los grupos"}
                onConfirm={() => this.autoasignarGrupos()}
                okText="Confirmar"
                cancelText="Cancelar"
              >
                <Col xs={24} sm={11} md={11} lg={8} xl={8}>
                  <Button
                    type="primary" size="large"
                    className="max-width"
                    disabled={this.state.cargando || this.state.apellidos.length < 3 || this.state.matricula.length === 0}
                  >
                    Aplicar
                  </Button>
                </Col>
              </Popconfirm>
            </Row>
          </Col>
        </Row>

        <Row className={'container'}>
          <Col span={24}>
            <TablaAsignaturas
              asignaturas={this.state.asignaturas}
              cargando={this.state.cargando}
              matricula={this.state.matricula}
              guardar={this.guardarAsignaturasSeleccionadas}
            />
          </Col>
        </Row>

        <SelectorAsignaturas
          asignaturas={this.state.asignaturas}
          visible={this.state.selectorVisible}
          seleccionadas={this.state.matricula}
          guardar={this.guardarAsignaturasSeleccionadas}
          cerrar={() => this.setState(ajustesReducer(this.state, cambiarVisibilidadSelectorAsignaturas()))}
        />
      </Layout.Content>
    );
  }
}

export default CONNECTOR(withRouter(Ajustes));
