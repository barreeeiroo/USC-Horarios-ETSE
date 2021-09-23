import React from "react";
import {HorarioProps, HorarioState} from "routes/horario/types";
import {initialState} from "routes/horario/reducers";
import {withRouter} from "react-router-dom";
import {CONNECTOR} from "routes/horario/actions";
import AppRoutes from "routes/index";
import {generarAsignaturas} from "utils/share";

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
    return <></>;
  }
}

export default CONNECTOR(withRouter(Horario));
