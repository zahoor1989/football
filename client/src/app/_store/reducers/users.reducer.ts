import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/users.actions';
export const usersFeatureKey = 'users';

export interface State {
  users: any[],
  loading : boolean,
  error: any
}

export const initialState: State = {
  users: [],
  loading : false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(UserActions.loadUsersUserss, (state) => ({...state,loading: false, error:null})),
  on(UserActions.loadUsersUserssSuccess, (state, { data }) => ({
    ...state,
    users:data.users,
    loading: true,
    error: null
  })),
  on(UserActions.loadUsersUserssFailure, (state,{error}) => ({...state,loading: false, error})),
);
