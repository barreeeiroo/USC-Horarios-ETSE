import {RootState} from "store/reducer";
import {connect, ConnectedProps} from "react-redux";
import {TablaAsignaturasState} from "components/tabla-asignaturas/types";

const mapState = (state: RootState): TablaAsignaturasState => ({});

const mapDispatch = {}

export const CONNECTOR = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof CONNECTOR>;
