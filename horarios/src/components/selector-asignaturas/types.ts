import {RouteComponentProps} from "react-router-dom";
import Asignatura from "models/asignatura";
import {PropsFromRedux} from "./actions";

// TODO: export interface SelectorAsignaturasProps extends PropsFromRedux, RouteComponentProps
export interface SelectorAsignaturasProps extends PropsFromRedux, RouteComponentProps {
  asignaturas: Asignatura[];
  visible: boolean;

  guardar(asignaturas: Asignatura[]): void;
}

export interface SelectorAsignaturasState {
  seleccionadas: Asignatura[];
  filtro: string;
}

export const SELECCIONAR_ASIGNATURA = 'SELECCIONAR_ASIGNATURA';
export const DESELECCIONAR_ASIGNATURA = 'DESELECCIONAR_ASIGNATURA';
export const CAMBIAR_FILTRO_ASIGNATURAS = 'CAMBIAR_FILTRO_ASIGNATURAS';

interface SeleccionarAsignaturaAction {
  type: typeof SELECCIONAR_ASIGNATURA;
  payload: { codigo: string, asignaturas: Asignatura[] };
}

interface DeseleccionarAsignaturaAction {
  type: typeof DESELECCIONAR_ASIGNATURA;
  payload: { codigo: string, asignaturas: Asignatura[] };
}

interface CambiarFiltroAsignaturasAction {
  type: typeof CAMBIAR_FILTRO_ASIGNATURAS;
  payload: { texto: string };
}

export type SelectorAsignaturasActionTypes =
  SeleccionarAsignaturaAction   |
  DeseleccionarAsignaturaAction |
  CambiarFiltroAsignaturasAction;
