import { createAction, props } from '@ngrx/store';

export const loadUsersUserss = createAction(
  '[Users] LoadUsers Userss'
);

export const loadUsersUserssSuccess = createAction(
  '[Users] LoadUsers Userss Success',
  props<{ data: any }>()
);

export const loadUsersUserssFailure = createAction(
  '[Users] LoadUsers Userss Failure',
  props<{ error: any }>()
);
