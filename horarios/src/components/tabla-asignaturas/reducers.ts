import {TablaAsignaturasActionTypes, TablaAsignaturasState} from "components/tabla-asignaturas/types";

export const initialState: TablaAsignaturasState = {}

export function tablaAsignaturasReducer(state = initialState, action: TablaAsignaturasActionTypes): TablaAsignaturasState {
  let newState: TablaAsignaturasState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    default:
      return state;
  }
}
