import React from "react";
import {AjustesProps, AjustesState} from "./types";
import {CONNECTOR, nuevaAsignatura} from "./actions";
import {withRouter} from "react-router-dom";
import {initialState, ajustesReducer} from "routes/ajustes/reducers";
import {Col, Layout, Row} from "antd";
import {request} from "utils/http";
import {BD} from "config";


class Ajustes extends React.Component<AjustesProps, AjustesState> {
  constructor(props: AjustesProps) {
    super(props);
    this.state = initialState;
  }

  private descargarDatos() {
    request(BD.FESTIVOS).then(json => {

    });
  }

  componentDidMount() {
    this.descargarDatos();
  }

  render() {
    return (
        <Row justify="space-between">
          <Col>
            <h1>Prueba</h1>
          </Col>
        </Row>
    );
  }
}

export default CONNECTOR(withRouter(Ajustes));