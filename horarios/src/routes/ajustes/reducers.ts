import {
  AjustesActionTypes,
  AjustesState,
  DESELECCIONAR_ASIGNATURA,
  NUEVA_ASIGNATURA,
  NUEVO_GRUPO,
  SELECCIONAR_ASIGNATURA,
} from "./types";
import Asignatura from "models/asignatura";

export const initialState: AjustesState = {
  asignaturas: [],
  grupos: [],

  matricula: []
}

export function ajustesReducer(state = initialState, action: AjustesActionTypes): AjustesState {
  let newState: AjustesState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case NUEVA_ASIGNATURA:
      newState = {...state, asignaturas: [...state.asignaturas, action.payload.asignatura]};
      return newState;

    case NUEVO_GRUPO:
      newState = {...state, grupos: [...state.grupos, action.payload.grupo]};
      return newState;

    case SELECCIONAR_ASIGNATURA:
      let asignatura = state.asignaturas.find(a => a.codigo === action.payload.codigo);
      if (asignatura === undefined)
        throw new Error("WTF esto no es posible");

      newState = {...state, matricula: [...state.matricula, asignatura]};
      return newState;

    case DESELECCIONAR_ASIGNATURA:
      let asignaturas: Asignatura[] = [];
      state.matricula.forEach(a => {
        if (a.codigo !== action.payload.codigo)
          asignaturas.push(a);
      });

      newState = {...state, matricula: asignaturas};
      return newState;

    default:
      return state;
  }
}
