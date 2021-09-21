import {RouteComponentProps} from "react-router-dom";
import Asignatura from "models/asignatura";
import {PropsFromRedux} from "./actions";

export interface SelectorAsignaturasProps extends PropsFromRedux, RouteComponentProps {
  asignaturas: Asignatura[];
}

export interface SelectorAsignaturasState {
  seleccionadas: Asignatura[];
}

export const SELECCIONAR_ASIGNATURA = 'SELECCIONAR_ASIGNATURA';
export const DESELECCIONAR_ASIGNATURA = 'DESELECCIONAR_ASIGNATURA';

interface SeleccionarAsignaturaAction {
  type: typeof SELECCIONAR_ASIGNATURA;
  payload: { codigo: string, asignaturas: Asignatura[] };
}

interface DeseleccionarAsignaturaAction {
  type: typeof DESELECCIONAR_ASIGNATURA;
  payload: { codigo: string, asignaturas: Asignatura[] };
}

export type SelectorAsignaturasActionTypes =
  SeleccionarAsignaturaAction |
  DeseleccionarAsignaturaAction;
