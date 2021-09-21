import {AnyAction} from "redux";

export type ActionHandler<TState, Action extends AnyAction> = (state: TState, action: Action) => TState;
