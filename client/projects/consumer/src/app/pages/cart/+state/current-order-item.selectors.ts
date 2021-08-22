import { createFeatureSelector, createSelector } from '@ngrx/store';

import { selectById, selectFirstEntity, selectLastEntity } from 'dist/library';
import { calculateTaxCurry } from '../../../../../../library/src/lib/utils/calculate-tax';
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

export const TAX_PERCENT = 6.75;

export const taxCalculator = calculateTaxCurry(TAX_PERCENT);

export const tax = createSelector(subTotal, taxCalculator);

export const total = createSelector(subTotal, tax, tip, (subTotalState, taxState, tipState) => subTotalState + taxState + tipState);
