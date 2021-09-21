import {
  DESELECCIONAR_ASIGNATURA,
  SELECCIONAR_ASIGNATURA,
  SelectorAsignaturasActionTypes,
  SelectorAsignaturasState
} from "./types";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "store/reducer";
import Asignatura from "models/asignatura";

export function seleccionarAsignatura(codigo: string, asignaturas: Asignatura[]): SelectorAsignaturasActionTypes {
  return {
    type: SELECCIONAR_ASIGNATURA,
    payload: {codigo, asignaturas}
  }
}

export function deseleccionarAsignatura(codigo: string, asignaturas: Asignatura[]): SelectorAsignaturasActionTypes {
  return {
    type: DESELECCIONAR_ASIGNATURA,
    payload: {codigo, asignaturas}
  }
}

const mapState = (state: RootState): SelectorAsignaturasState => ({
  seleccionadas: state.ajustes.seleccionadas
});

const mapDispatch = {
  seleccionarAsignatura: seleccionarAsignatura,
  deseleccionarAsignatura: deseleccionarAsignatura
}

export const CONNECTOR = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof CONNECTOR>;
