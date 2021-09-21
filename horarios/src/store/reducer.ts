import {combineReducers, Reducer} from 'redux';
import {ajustesReducer} from 'routes/ajustes/reducers';
import {StoreState} from './types';
import {selectorAsignaturasReducer} from "components/selector-asignaturas/reducers";

export const rootReducer: Reducer = combineReducers<StoreState>({
  ajustes: ajustesReducer,
  selectorAsignaturas: selectorAsignaturasReducer
});

export type RootState = ReturnType<typeof rootReducer>;
