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

  // Materias seleccionadas
  matricula: Asignatura[];
}

export const NUEVA_ASIGNATURA = 'NUEVA_ASIGNATURA';
export const CARGAR_ASIGNATURAS = 'CARGAR_ASIGNATURAS';
export const NUEVA_CLASE = 'NUEVA_CLASE';
export const NUEVO_GRUPO = 'NUEVO_GRUPO';
export const REASIGNAR_GRUPOS = 'REASIGNAR_GRUPOS'

interface InsertarNuevaAsignaturaAction {
  type: typeof NUEVA_ASIGNATURA;
  payload: { asignatura: Asignatura };
}

interface GuardarCargaAsignaturasAction {
  type: typeof CARGAR_ASIGNATURAS;
  payload: { asignaturas: Asignatura[] }
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


export type AjustesActionTypes =
  InsertarNuevaAsignaturaAction |
  GuardarCargaAsignaturasAction |
  InsertarNuevaClaseAction      |
  InsertarNuevoGrupoAction      |
  ReasignarGruposAction;
