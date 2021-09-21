import React from "react";
import {AjustesProps, AjustesState} from "./types";
import {CONNECTOR} from "./actions";
import {withRouter} from "react-router-dom";


class Ajustes extends React.Component<AjustesProps, AjustesState> {
  render() {
    return (
      <></>
    );
  }
}

export default CONNECTOR(withRouter(Ajustes));