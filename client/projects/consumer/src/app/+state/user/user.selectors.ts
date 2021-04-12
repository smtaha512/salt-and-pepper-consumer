import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, userFeatureKey } from './user.reducer';

export const userSelector = createFeatureSelector<State>(userFeatureKey);

export const userId = createSelector(userSelector, (user) => user?._id);
