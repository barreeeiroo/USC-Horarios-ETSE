import React from "react";
import {AjustesProps, AjustesState} from "./types";
import {CONNECTOR, nuevaAsignatura, nuevaClase, nuevoGrupo, reasignarGrupos} from "./actions";
import {withRouter} from "react-router-dom";
import {ajustesReducer, initialState} from "routes/ajustes/reducers";
import {Button, Col, Input, Layout, Row} from "antd";
import {request} from "utils/http";
import {BD} from "config";
import {parsearAsignaturas, parsearClases, parsearGrupos} from "utils/spreadsheet-json";


class Ajustes extends React.Component<AjustesProps, AjustesState> {
  constructor(props: AjustesProps) {
    super(props);
    this.state = initialState;
  }

  private descargarDatos() {
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
          this.setState(state, () => console.log(this.state));
        });
      });
    });
  }

  componentDidMount() {
    this.descargarDatos();
  }

  render() {
    return (
      <Layout.Content>
        <Row justify="space-between">
          <Col xs={24} sm={24} md={24} lg={8} xl={8}>
            <Button
              className="max-width"
              type="default" size="large"
            >
              9 Asignaturas
            </Button>
          </Col>
          <Col xs={24} sm={24} md={24} lg={15} xl={15}>
            <Row justify="space-between">
              <Col xs={24} sm={12} md={12} lg={15} xl={15}>
                <Input
                  placeholder="Apellidos..." allowClear size="large"
                  onChange={e => console.log(e.target.value)} value={""}
                />
              </Col>
              <Col xs={24} sm={11} md={11} lg={8} xl={8}>
                <Button
                  type="primary" size="large"
                  className="max-width"
                >
                  Aplicar
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Layout.Content>
    );
  }
}

export default CONNECTOR(withRouter(Ajustes));