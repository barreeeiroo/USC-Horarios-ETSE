import {
  AjustesActionTypes,
  AjustesState,
  DESELECCIONAR_ASIGNATURA,
  NUEVA_ASIGNATURA,
  NUEVO_GRUPO,
  SELECCIONAR_ASIGNATURA
} from "./types";
import Asignatura from "models/asignatura";
import {Grupo} from "models/grupo";
import {RootState} from "store/reducer";
import {connect, ConnectedProps} from "react-redux";


export function nuevaAsignatura(asignatura: Asignatura): AjustesActionTypes {
  return {
    type: NUEVA_ASIGNATURA,
    payload: {asignatura}
  }
}

export function nuevoGrupo(grupo: Grupo): AjustesActionTypes {
  return {
    type: NUEVO_GRUPO,
    payload: {grupo}
  }
}

export function seleccionarAsignatura(codigo: string): AjustesActionTypes {
  return {
    type: SELECCIONAR_ASIGNATURA,
    payload: {codigo}
  }
}

export function deseleccionarAsignatura(codigo: string): AjustesActionTypes {
  return {
    type: DESELECCIONAR_ASIGNATURA,
    payload: {codigo}
  }
}


const mapState = (state: RootState): AjustesState => ({
  asignaturas: state.ajustes.asignaturas,
  grupos: state.ajustes.grupos,
  matricula: state.ajustes.matricula
});

const mapDispatch = {
  nuevaAsignatura: nuevaAsignatura,
  nuevoGrupo: nuevoGrupo,
  seleccionarAsignatura: seleccionarAsignatura,
  deseleccionarAsignatura: deseleccionarAsignatura
}

export const CONNECTOR = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof CONNECTOR>;
