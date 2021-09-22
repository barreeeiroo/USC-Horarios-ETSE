import {
  CAMBIAR_FILTRO_ASIGNATURAS,
  DESELECCIONAR_ASIGNATURA,
  SELECCIONAR_ASIGNATURA,
  SelectorAsignaturasActionTypes,
  SelectorAsignaturasState,
} from "./types";
import Asignatura from "models/asignatura";

export const initialState: SelectorAsignaturasState = {
  // TODO(diego@kodular.io): Esto es un prop, no state
  seleccionadas: [],
  filtro: ""
}

export function selectorAsignaturasReducer(state = initialState, action: SelectorAsignaturasActionTypes): SelectorAsignaturasState {
  let newState: SelectorAsignaturasState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case SELECCIONAR_ASIGNATURA:
      let asignatura = action.payload.asignaturas.find(a => a.codigo === action.payload.codigo);
      if (asignatura === undefined)
        throw new Error();

      newState = {...newState, seleccionadas: [...newState.seleccionadas, asignatura]};
      return newState;

    case DESELECCIONAR_ASIGNATURA:
      let asignaturas: Asignatura[] = [];
      newState.seleccionadas.forEach(a => {
        if (a.codigo !== action.payload.codigo)
          asignaturas.push(a);
      });

      newState = {...newState, seleccionadas: asignaturas};
      return newState;

    case CAMBIAR_FILTRO_ASIGNATURAS:
      newState = {...newState, filtro: action.payload.texto};
      return newState;

    default:
      return state;
  }
}
