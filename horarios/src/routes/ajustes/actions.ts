import {
  AjustesActionTypes,
  AjustesState,
  CAMBIAR_APELLIDOS,
  CAMBIAR_CARGANDO,
  CAMBIAR_VISIBILIDAD_SELECTOR_ASIGNATURAS,
  CARGAR_ASIGNATURAS,
  NUEVA_ASIGNATURA,
  NUEVA_CLASE,
  NUEVO_GRUPO,
  REASIGNAR_GRUPOS,
} from "./types";
import Asignatura from "models/asignatura";
import {Grupo} from "models/grupo";
import {RootState} from "store/reducer";
import {connect, ConnectedProps} from "react-redux";
import {Clase} from "models/clase";


export function nuevaAsignatura(asignatura: Asignatura): AjustesActionTypes {
  return {
    type: NUEVA_ASIGNATURA,
    payload: {asignatura}
  }
}

export function nuevaClase(clase: Clase): AjustesActionTypes {
  return {
    type: NUEVA_CLASE,
    payload: {clase}
  }
}

export function nuevoGrupo(grupo: Grupo): AjustesActionTypes {
  return {
    type: NUEVO_GRUPO,
    payload: {grupo}
  }
}

export function reasignarGrupos(): AjustesActionTypes {
  return {
    type: REASIGNAR_GRUPOS
  }
}

export function cambiarCargando(): AjustesActionTypes {
  return {
    type: CAMBIAR_CARGANDO
  }
}

export function cambiarVisibilidadSelectorAsignaturas(): AjustesActionTypes {
  return {
    type: CAMBIAR_VISIBILIDAD_SELECTOR_ASIGNATURAS
  }
}

export function cargarAsignaturas(asignaturas: Asignatura[]): AjustesActionTypes {
  return {
    type: CARGAR_ASIGNATURAS,
    payload: {asignaturas}
  }
}

export function cambiarApellidos(apellidos: string): AjustesActionTypes {
  return {
    type: CAMBIAR_APELLIDOS,
    payload: {apellidos}
  }
}


const mapState = (state: RootState): AjustesState => ({
  asignaturas: state.ajustes.asignaturas,
  grupos: state.ajustes.grupos,
  cargando: state.ajustes.cargando,
  selectorVisible: state.ajustes.selectorVisible,
  matricula: state.ajustes.matricula,
  apellidos: state.ajustes.apellidos
});

const mapDispatch = {
  nuevaAsignatura: nuevaAsignatura,
  nuevaClase: nuevaClase,
  nuevoGrupo: nuevoGrupo,
  reasignarGrupos: reasignarGrupos,
  cambiarCargando: cambiarCargando,
  cambiarVisibilidadSelectorAsignaturas: cambiarVisibilidadSelectorAsignaturas,
  cargarAsignaturas: cargarAsignaturas,
  cambiarApellidos: cambiarApellidos
}

export const CONNECTOR = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof CONNECTOR>;
