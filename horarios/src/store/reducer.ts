import {combineReducers, Reducer} from 'redux';
import {ajustesReducer} from 'routes/ajustes/reducers';
import {StoreState} from './types';

export const rootReducer: Reducer = combineReducers<StoreState>({
  ajustes: ajustesReducer
});

export type RootState = ReturnType<typeof rootReducer>;
