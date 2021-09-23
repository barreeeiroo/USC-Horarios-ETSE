import {RouteComponentProps} from "react-router-dom";
import {PropsFromRedux} from "routes/horario/actions";

export interface HorarioProps extends PropsFromRedux, RouteComponentProps {

}

export interface HorarioState {
}

export type HorarioActionTypes =
  { type: undefined, action: undefined };
