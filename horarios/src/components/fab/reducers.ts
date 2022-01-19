import {CAMBIAR_MODAL_VISIBLE, FabActionTypes, FabState} from "components/fab/types";

export const initialState: FabState = {
  visible: false
}

export function fabReducer(state = initialState, action: FabActionTypes): FabState {
  let newState: FabState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case CAMBIAR_MODAL_VISIBLE:
      newState.visible = action.payload.visible;
      break;

    default:
      return state;
  }

  return newState;
}
