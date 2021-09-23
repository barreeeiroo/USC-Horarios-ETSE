import {RootState} from "store/reducer";
import {connect, ConnectedProps} from "react-redux";
import {HorarioState} from "routes/horario/types";

const mapState = (state: RootState): HorarioState => ({});

const mapDispatch = {}

export const CONNECTOR = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof CONNECTOR>;
