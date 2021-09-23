import {HorarioActionTypes, HorarioState} from "routes/horario/types";

export const initialState: HorarioState = {}

export function horarioReducer(state = initialState, action: HorarioActionTypes): HorarioState {
  // let newState: TablaAsignaturasState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    default:
      return state;
  }
}
