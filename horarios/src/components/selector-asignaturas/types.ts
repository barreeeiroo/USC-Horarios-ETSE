import {RouteComponentProps} from "react-router-dom";
import Asignatura from "models/asignatura";
import {PropsFromRedux} from "./actions";

export interface SelectorAsignaturasProps extends PropsFromRedux, RouteComponentProps {
  asignaturas: Asignatura[];
  visible: boolean;
  seleccionadas: Asignatura[];

  guardar(asignaturas: Asignatura[]): void;
  cerrar(): void;
}

export interface SelectorAsignaturasState {
  filtro: string;
}

export const CAMBIAR_FILTRO_ASIGNATURAS = 'CAMBIAR_FILTRO_ASIGNATURAS';

interface CambiarFiltroAsignaturasAction {
  type: typeof CAMBIAR_FILTRO_ASIGNATURAS;
  payload: { texto: string };
}

export type SelectorAsignaturasActionTypes =
  CambiarFiltroAsignaturasAction;
