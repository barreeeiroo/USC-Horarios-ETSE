import {CAMBIAR_MODAL_VISIBLE, FabActionTypes, FabState} from "./types";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "store/reducer";

export function cambiarModalVisible(visible: boolean): FabActionTypes {
  return {
    type: CAMBIAR_MODAL_VISIBLE,
    payload: {visible}
  }
}

const mapState = (state: RootState): FabState => ({
  visible: state.fab.visible
});

const mapDispatch = {
  cambiarModalVisible: cambiarModalVisible
}

export const CONNECTOR = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof CONNECTOR>;
