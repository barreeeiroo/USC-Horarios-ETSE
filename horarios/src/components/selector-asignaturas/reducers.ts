import {
  SelectorAsignaturasActionTypes,
  SelectorAsignaturasState,
  DESELECCIONAR_ASIGNATURA,
  SELECCIONAR_ASIGNATURA,
} from "./types";
import Asignatura from "models/asignatura";

export const initialState: SelectorAsignaturasState = {
  seleccionadas: []
}

export function selectorAsignaturasReducer(state = initialState, action: SelectorAsignaturasActionTypes): SelectorAsignaturasState {
  let newState: SelectorAsignaturasState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case SELECCIONAR_ASIGNATURA:
      let asignatura = action.payload.asignaturas.find(a => a.codigo === action.payload.codigo);
      if (asignatura === undefined)
        throw new Error();

      newState = {...state, seleccionadas: [...state.seleccionadas, asignatura]};
      return newState;

    case DESELECCIONAR_ASIGNATURA:
      let asignaturas: Asignatura[] = [];
      state.seleccionadas.forEach(a => {
        if (a.codigo !== action.payload.codigo)
          asignaturas.push(a);
      });

      newState = {...state, seleccionadas: asignaturas};
      return newState;

    default:
      return state;
  }
}
