import {PropsFromRedux} from "./actions";
import {RouteComponentProps} from "react-router-dom";
import Asignatura from "models/asignatura";
import {Grupo} from "models/grupo";
import {Clase} from "models/clase";

export interface AjustesProps extends PropsFromRedux, RouteComponentProps {

}

export interface AjustesState {
  // Datos de la base de datos globales
  asignaturas: Asignatura[];
  // Grupos que no están asignados a asignaturas (temporal, luego se reasignan a asignaturas)
  grupos: Grupo[];

  // Descargando los datos
  cargando: boolean;
  // Selector visible
  selectorVisible: boolean;
  // Materias seleccionadas
  matricula: Asignatura[];
  // Apellidos para clasificar los grupos
  apellidos: string;
}

export const NUEVA_ASIGNATURA = 'NUEVA_ASIGNATURA';
export const NUEVA_CLASE = 'NUEVA_CLASE';
export const NUEVO_GRUPO = 'NUEVO_GRUPO';
export const REASIGNAR_GRUPOS = 'REASIGNAR_GRUPOS'

export const CAMBIAR_CARGANDO = 'CAMBIAR_CARGANDO';
export const CAMBIAR_VISIBILIDAD_SELECTOR_ASIGNATURAS = 'CAMBIAR_VISIBILIDAD_SELECTOR_ASIGNATURAS';
export const CAMBIAR_APELLIDOS = 'CAMBIAR_APELLIDOS';

export const MATRICULAR = 'MATRICULAR';

interface InsertarNuevaAsignaturaAction {
  type: typeof NUEVA_ASIGNATURA;
  payload: { asignatura: Asignatura };
}

interface InsertarNuevaClaseAction {
  type: typeof NUEVA_CLASE;
  payload: { clase: Clase };
}

interface InsertarNuevoGrupoAction {
  type: typeof NUEVO_GRUPO;
  payload: { grupo: Grupo };
}

interface ReasignarGruposAction {
  type: typeof REASIGNAR_GRUPOS;
}

interface CambiarCargandoAction {
  type: typeof CAMBIAR_CARGANDO;
}

interface CambiarVisibilidadSelectorAsignaturasAction {
  type: typeof CAMBIAR_VISIBILIDAD_SELECTOR_ASIGNATURAS;
}

interface CambiarApellidosAction {
  type: typeof CAMBIAR_APELLIDOS;
  payload: { apellidos: string };
}

interface MatricularAction {
  type: typeof MATRICULAR;
  payload: { asignaturas: Asignatura[] };
}


export type AjustesActionTypes =
  InsertarNuevaAsignaturaAction |
  InsertarNuevaClaseAction |
  InsertarNuevoGrupoAction |
  ReasignarGruposAction |
  CambiarCargandoAction |
  CambiarVisibilidadSelectorAsignaturasAction |
  CambiarApellidosAction |
  MatricularAction;
