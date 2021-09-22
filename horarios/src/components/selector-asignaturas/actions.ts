import {
  CAMBIAR_FILTRO_ASIGNATURAS,
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

export function cambiarFiltroAsignaturas(texto: string): SelectorAsignaturasActionTypes {
  return {
    type: CAMBIAR_FILTRO_ASIGNATURAS,
    payload: {texto}
  }
}

const mapState = (state: RootState): SelectorAsignaturasState => ({
  seleccionadas: state.selectorAsignaturas.seleccionadas,
  filtro: state.selectorAsignaturas.filtro
});

const mapDispatch = {
  seleccionarAsignatura: seleccionarAsignatura,
  deseleccionarAsignatura: deseleccionarAsignatura,
  cambiarFiltroAsignaturas: cambiarFiltroAsignaturas
}

export const CONNECTOR = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof CONNECTOR>;
