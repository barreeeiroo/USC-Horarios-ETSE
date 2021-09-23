import {RootState} from "store/reducer";
import {connect, ConnectedProps} from "react-redux";
import {
  CAMBIAR_CARGANDO,
  FIJAR_FESTIVOS,
  FIJAR_MATRICULA,
  HorarioActionTypes,
  HorarioState,
  NUEVO_EVENTO
} from "routes/horario/types";
import Asignatura from "models/asignatura";
import {Festivo} from "models/festivo";
import {EventInput} from "@fullcalendar/react";

export function cambiarCargando(): HorarioActionTypes {
  return {
    type: CAMBIAR_CARGANDO
  }
}

export function fijarMatricula(asignaturas: Asignatura[]): HorarioActionTypes {
  return {
    type: FIJAR_MATRICULA,
    payload: {asignaturas: asignaturas}
  }
}

export function fijarFestivos(festivos: Festivo[]): HorarioActionTypes {
  return {
    type: FIJAR_FESTIVOS,
    payload: {festivos: festivos}
  }
}

export function nuevoEvento(evento: EventInput): HorarioActionTypes {
  return {
    type: NUEVO_EVENTO,
    payload: {evento: evento}
  }
}

const mapState = (state: RootState): HorarioState => ({
  cargando: state.horario.cargando,
  matricula: state.horario.matricula,
  festivos: state.horario.festivos,
  eventos: state.horario.eventos
});

const mapDispatch = {
  cambiarCargando: cambiarCargando,
  fijarMatricula: fijarMatricula,
  fijarFestivos: fijarFestivos,
  nuevoEvento: nuevoEvento
};

export const CONNECTOR = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof CONNECTOR>;
