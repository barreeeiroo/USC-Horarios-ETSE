import {CAMBIAR_FILTRO_ASIGNATURAS, SelectorAsignaturasActionTypes, SelectorAsignaturasState,} from "./types";

export const initialState: SelectorAsignaturasState = {
  filtro: ""
}

export function selectorAsignaturasReducer(state = initialState, action: SelectorAsignaturasActionTypes): SelectorAsignaturasState {
  let newState: SelectorAsignaturasState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case CAMBIAR_FILTRO_ASIGNATURAS:
      newState = {...newState, filtro: action.payload.texto};
      return newState;

    default:
      return state;
  }
}
