import { createFeatureSelector, createSelector } from '@ngrx/store';

import { selectById, selectFirstEntity, selectLastEntity } from 'dist/library';
import { CurrentOrderItem } from './current-order-item.model';
import { currentOrderItemsFeatureKey, selectAll, selectEntities, selectIds, selectTotal, State } from './current-order-item.reducer';

export const currentOrderItemState = createFeatureSelector<State>(currentOrderItemsFeatureKey);

export const currentOrderItemIds = createSelector(currentOrderItemState, selectIds);

export const currentOrderItemEntities = createSelector(currentOrderItemState, selectEntities);

export const currentOrderItems = createSelector(currentOrderItemState, selectAll);

export const totalCurrentOrderItemsEntities = createSelector(currentOrderItemState, selectTotal);

export const totalCurrentOrderItems = createSelector(currentOrderItems, (currentOrderItemsState) =>
  currentOrderItemsState.reduce((acc, curr) => acc + curr.quantity, 0)
);

export const currentOrderItemById = selectById<CurrentOrderItem>(currentOrderItemEntities);

export const firstCurrentOrderItem = selectFirstEntity<CurrentOrderItem>(currentOrderItemEntities, currentOrderItemIds);

export const lastCurrentOrderItem = selectLastEntity<CurrentOrderItem>(currentOrderItemEntities, currentOrderItemIds);

export const tip = createSelector(currentOrderItemState, (state) => state.tip);

export const subTotal = createSelector(currentOrderItems, (state) => state.reduce((acc, curr) => acc + curr.price * curr.quantity, 0));

const TAX_PERCENT = 20;

export const tax = createSelector(subTotal, (state) => (state * TAX_PERCENT) / 100);

export const total = createSelector(subTotal, tax, tip, (subTotalState, taxState, tipState) => subTotalState + taxState + tipState);
