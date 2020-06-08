import { createAction, props } from '@ngrx/store';

export const LOGOUT = '[App] Logout';
export const logoutAction = createAction(LOGOUT);

export const PUSH_STATE_TO_STORAGE = '[App] Push State to Storage';
export const pushStateToStorage = createAction(PUSH_STATE_TO_STORAGE);

export const PULL_STATE_FROM_STORAGE = '[App] Pull State from Storage';
export const pullStateFromStorage = createAction(PULL_STATE_FROM_STORAGE);

export const PULL_STATE_FROM_STORAGE_SUCCESS = '[App] Pull State from Storage Success';
export const pullStateFromStorageSuccess = createAction(PULL_STATE_FROM_STORAGE_SUCCESS, props<{ payload: any }>());

export const PULL_STATE_FROM_STORAGE_FAILURE = '[App] Pull State from Storage Failure';
export const pullStateFromStorageFailure = createAction(PULL_STATE_FROM_STORAGE_FAILURE);
