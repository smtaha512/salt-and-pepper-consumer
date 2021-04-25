import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, userFeatureKey } from './user.reducer';

export const userSelector = createFeatureSelector<State>(userFeatureKey);

export const user = createSelector(userSelector, (userWithToken) => userWithToken?.body);

export const userId = createSelector(userSelector, (userWithToken) => userWithToken?.body?._id);
