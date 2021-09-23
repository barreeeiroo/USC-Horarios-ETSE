import {
  CAMBIAR_CARGANDO,
  FIJAR_FESTIVOS,
  FIJAR_MATRICULA,
  HorarioActionTypes,
  HorarioState,
  NUEVO_EVENTO
} from "routes/horario/types";

export const initialState: HorarioState = {
  cargando: true,
  matricula: [],
  festivos: [],
  eventos: []
};

export function horarioReducer(state = initialState, action: HorarioActionTypes): HorarioState {
  let newState: HorarioState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case CAMBIAR_CARGANDO:
      newState = {...newState, cargando: !newState.cargando};
      return newState;

    case FIJAR_MATRICULA:
      newState = {...newState, matricula: action.payload.asignaturas};
      return newState;

    case FIJAR_FESTIVOS:
      newState = {...newState, festivos: action.payload.festivos};
      return newState;

    case NUEVO_EVENTO:
      newState = {...newState, eventos: [...newState.eventos, action.payload.evento]};
      return newState;

    default:
      return state;
  }
}
