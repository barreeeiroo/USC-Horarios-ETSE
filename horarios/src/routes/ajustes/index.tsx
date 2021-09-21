import React from "react";
import {AjustesProps, AjustesState} from "./types";
import {CONNECTOR, nuevaAsignatura} from "./actions";
import {withRouter} from "react-router-dom";
import {initialState, ajustesReducer} from "routes/ajustes/reducers";
import {Col, Layout, Row} from "antd";


class Ajustes extends React.Component<AjustesProps, AjustesState> {
  constructor(props: AjustesProps) {
    super(props);
    this.state = initialState;
  }

  private test() {
    let state = this.state;
    state = ajustesReducer(state, nuevaAsignatura({
      codigo: "a",
      nombre: "",
      abreviatura: "",
      clases: [],
      periodo: "1SG"
    }));
    state = ajustesReducer(state, nuevaAsignatura({
      codigo: "b",
      nombre: "",
      abreviatura: "",
      clases: [],
      periodo: "1SG"
    }));
    state = ajustesReducer(state, nuevaAsignatura({
      codigo: "c",
      nombre: "",
      abreviatura: "",
      clases: [],
      periodo: "1SG"
    }));

    this.setState(state, () => console.log(this.state));
  }

  componentDidMount() {
    this.test();
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