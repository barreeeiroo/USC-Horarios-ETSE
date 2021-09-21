import {combineReducers, Reducer} from 'redux';
import {ajustesReducer} from 'routes/ajustes/reducers';

export const rootReducer: Reducer = combineReducers({
  ajustes: ajustesReducer
});

export type RootState = ReturnType<typeof rootReducer>;
