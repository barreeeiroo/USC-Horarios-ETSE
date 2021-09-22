import {
  AjustesActionTypes,
  AjustesState,
  CAMBIAR_APELLIDOS,
  CAMBIAR_CARGANDO,
  CAMBIAR_VISIBILIDAD_SELECTOR_ASIGNATURAS,
  CARGAR_ASIGNATURAS,
  NUEVA_ASIGNATURA,
  NUEVA_CLASE,
  NUEVO_GRUPO,
  REASIGNAR_GRUPOS,
} from "./types";

export const initialState: AjustesState = {
  asignaturas: [],
  grupos: [],

  cargando: true,
  selectorVisible: false,
  matricula: [],
  apellidos: ""
}

export function ajustesReducer(state = initialState, action: AjustesActionTypes): AjustesState {
  let newState: AjustesState = JSON.parse(JSON.stringify(state));
  let asignatura;

  switch (action.type) {
    case NUEVA_ASIGNATURA:
      newState = {...newState, asignaturas: [...newState.asignaturas, action.payload.asignatura]};
      return newState;

    case NUEVA_CLASE:
      asignatura = newState.asignaturas.find(a => a.abreviatura === action.payload.clase.asignatura);
      if (asignatura === undefined)
        throw new Error();

      asignatura.clases.push(action.payload.clase);
      return newState;

    case NUEVO_GRUPO:
      if (action.payload.grupo.asignatura === "-") {
        newState = {...newState, grupos: [...newState.grupos, action.payload.grupo]};
        return newState;
      }

      asignatura = newState.asignaturas.find(a => a.abreviatura === action.payload.grupo.asignatura);
      if (asignatura === undefined)
        throw new Error();
      let clases = asignatura.clases.filter(c => c.tipo === action.payload.grupo.tipo && c.grupo === action.payload.grupo.grupo);
      if (clases === undefined || clases.length === 0)
        throw new Error();

      clases.forEach(clase => {
        clase.grupos.push(action.payload.grupo);
      })
      return newState;

    case REASIGNAR_GRUPOS:
      newState.asignaturas.forEach(asignatura => {
        asignatura.clases.forEach(clase => {
          if (clase.grupos.length === 0) {
            let grupos = newState.grupos.filter(g => g.grupo === clase.grupo && g.tipo === clase.tipo);
            grupos.forEach(grupo => {
              clase.grupos.push(grupo);
            })
          }
        });
      });

      newState.grupos = [];
      return newState;

    case CAMBIAR_CARGANDO:
      newState = {...newState, cargando: !newState.cargando};
      return newState;

    case CAMBIAR_VISIBILIDAD_SELECTOR_ASIGNATURAS:
      newState = {...newState, selectorVisible: !newState.selectorVisible};
      return newState;

    case CARGAR_ASIGNATURAS:
      newState = {...newState, matricula: action.payload.asignaturas};
      return newState;

    case CAMBIAR_APELLIDOS:
      newState = {...newState, apellidos: action.payload.apellidos};
      return newState;

    default:
      return state;
  }
}
