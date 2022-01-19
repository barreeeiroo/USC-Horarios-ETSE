import {RouteComponentProps} from "react-router-dom";
import {PropsFromRedux} from "components/fab/actions";

export interface FabProps extends PropsFromRedux, RouteComponentProps {

}

export interface FabState {
  visible: boolean;
}

export const CAMBIAR_MODAL_VISIBLE = 'CAMBIAR_MODAL_VISIBLE';

interface CambiarModalVisibleAction {
  type: typeof CAMBIAR_MODAL_VISIBLE;
  payload: { visible: boolean };
}

export type FabActionTypes = CambiarModalVisibleAction;
