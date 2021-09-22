import {CAMBIAR_FILTRO_ASIGNATURAS, SelectorAsignaturasActionTypes, SelectorAsignaturasState} from "./types";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "store/reducer";

export function cambiarFiltroAsignaturas(texto: string): SelectorAsignaturasActionTypes {
  return {
    type: CAMBIAR_FILTRO_ASIGNATURAS,
    payload: {texto}
  }
}

const mapState = (state: RootState): SelectorAsignaturasState => ({
  filtro: state.selectorAsignaturas.filtro
});

const mapDispatch = {
  cambiarFiltroAsignaturas: cambiarFiltroAsignaturas
}

export const CONNECTOR = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof CONNECTOR>;
