import {PropsFromRedux} from "./actions";
import {RouteComponentProps} from "react-router-dom";
import Asignatura from "models/asignatura";
import {Grupo} from "models/grupo";

export interface AjustesProps extends PropsFromRedux, RouteComponentProps {

}

export interface AjustesState {
  // Datos de la base de datos globales
  asignaturas: Asignatura[];
  grupos: Grupo[];

  // Materias seleccionadas
  matricula: Asignatura[];
}

export const NUEVA_ASIGNATURA = 'NUEVA_ASIGNATURA';
export const NUEVO_GRUPO = 'NUEVO_GRUPO';
export const SELECCIONAR_ASIGNATURA = 'SELECCIONAR_ASIGNATURA';
export const DESELECCIONAR_ASIGNATURA = 'DESELECCIONAR_ASIGNATURA';

interface InsertarNuevaAsignaturaAction {
  type: typeof NUEVA_ASIGNATURA;
  payload: { asignatura: Asignatura };
}

interface InsertarNuevoGrupoAction {
  type: typeof NUEVO_GRUPO;
  payload: { grupo: Grupo };
}

interface SeleccionarAsignaturaAction {
  type: typeof SELECCIONAR_ASIGNATURA;
  payload: { codigo: string };
}

interface DeseleccionarAsignaturaAction {
  type: typeof DESELECCIONAR_ASIGNATURA;
  payload: { codigo: string };
}

export type AjustesActionTypes =
  InsertarNuevaAsignaturaAction |
  InsertarNuevoGrupoAction |
  SeleccionarAsignaturaAction |
  DeseleccionarAsignaturaAction;
