import {RouteComponentProps} from "react-router-dom";
import {PropsFromRedux} from "routes/horario/actions";
import Asignatura from "models/asignatura";
import {Festivo} from "models/festivo";
import {EventInput} from "@fullcalendar/react";

export interface HorarioProps extends PropsFromRedux, RouteComponentProps {

}

export interface HorarioState {
  cargando: boolean;
  matricula: Asignatura[];
  festivos: Festivo[];
  eventos: EventInput[];
}

export const CAMBIAR_CARGANDO = 'CAMBIAR_CARGANDO';
export const FIJAR_MATRICULA = 'FIJAR_MATRICULA';
export const FIJAR_FESTIVOS = 'FIJAR_FESTIVOS';
export const NUEVO_EVENTO = 'NUEVO_EVENTO';

interface CambiarCargandoAction {
  type: typeof CAMBIAR_CARGANDO;
}

interface FijarMatriculaAction {
  type: typeof FIJAR_MATRICULA;
  payload: { asignaturas: Asignatura[] };
}

interface FijarFestivosAction {
  type: typeof FIJAR_FESTIVOS;
  payload: { festivos: Festivo[] };
}

interface NuevoEventoAction {
  type: typeof NUEVO_EVENTO;
  payload: { evento: EventInput };
}

export type HorarioActionTypes =
  CambiarCargandoAction |
  FijarMatriculaAction |
  FijarFestivosAction |
  NuevoEventoAction;
