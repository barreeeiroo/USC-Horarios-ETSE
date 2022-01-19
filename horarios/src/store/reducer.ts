import {combineReducers, Reducer} from 'redux';
import {ajustesReducer} from 'routes/ajustes/reducers';
import {StoreState} from './types';
import {selectorAsignaturasReducer} from "components/selector-asignaturas/reducers";
import {tablaAsignaturasReducer} from "components/tabla-asignaturas/reducers";
import {horarioReducer} from "routes/horario/reducers";
import {fabReducer} from "components/fab/reducers";

export const rootReducer: Reducer = combineReducers<StoreState>({
  ajustes: ajustesReducer,
  horario: horarioReducer,

  fab: fabReducer,
  selectorAsignaturas: selectorAsignaturasReducer,
  tablaAsignaturas: tablaAsignaturasReducer
});

export type RootState = ReturnType<typeof rootReducer>;
