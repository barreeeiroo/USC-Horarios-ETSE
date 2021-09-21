import {
  AjustesActionTypes,
  AjustesState,
  CARGAR_ASIGNATURAS,
  NUEVA_ASIGNATURA,
  NUEVA_CLASE,
  NUEVO_GRUPO,
} from "./types";

export const initialState: AjustesState = {
  asignaturas: [],

  matricula: []
}

export function ajustesReducer(state = initialState, action: AjustesActionTypes): AjustesState {
  let newState: AjustesState = JSON.parse(JSON.stringify(state));
  let asignatura, clase;

  switch (action.type) {
    case NUEVA_ASIGNATURA:
      newState = {...state, asignaturas: [...state.asignaturas, action.payload.asignatura]};
      return newState;

    case CARGAR_ASIGNATURAS:
      newState = {...state, matricula: action.payload.asignaturas};
      return newState;

    case NUEVA_CLASE:
      asignatura = newState.asignaturas.find(a => a.abreviatura === action.payload.clase.asignatura);
      if (asignatura === undefined)
        throw new Error();

      asignatura.clases.push(action.payload.clase);
      return newState;

    case NUEVO_GRUPO:
      asignatura = newState.asignaturas.find(a => a.abreviatura === action.payload.grupo.asignatura);
      if (asignatura === undefined)
        throw new Error();
      clase = asignatura.clases.find(c => c.tipo === action.payload.grupo.tipo);
      if (clase === undefined)
        throw new Error();

      clase.grupos.push(action.payload.grupo);
      return newState;

    default:
      return state;
  }
}
