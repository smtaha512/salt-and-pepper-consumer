import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { CurrentOrderItem } from './current-order-item.model';

export const loadCurrentOrderItems = createAction(
  '[CurrentOrderItem/API] Load CurrentOrderItems',
  props<{ currentOrderItems: CurrentOrderItem[] }>()
);

export const addCurrentOrderItem = createAction(
  '[CurrentOrderItem/API] Add CurrentOrderItem',
  props<{ currentOrderItem: CurrentOrderItem }>()
);

export const upsertCurrentOrderItem = createAction(
  '[CurrentOrderItem/API] Upsert CurrentOrderItem',
  props<{ currentOrderItem: CurrentOrderItem }>()
);

export const addCurrentOrderItems = createAction(
  '[CurrentOrderItem/API] Add CurrentOrderItems',
  props<{ currentOrderItems: CurrentOrderItem[] }>()
);

export const upsertCurrentOrderItems = createAction(
  '[CurrentOrderItem/API] Upsert CurrentOrderItems',
  props<{ currentOrderItems: CurrentOrderItem[] }>()
);

export const updateCurrentOrderItem = createAction(
  '[CurrentOrderItem/API] Update CurrentOrderItem',
  props<{ currentOrderItem: Update<CurrentOrderItem> }>()
);

export const updateCurrentOrderItems = createAction(
  '[CurrentOrderItem/API] Update CurrentOrderItems',
  props<{ currentOrderItems: Update<CurrentOrderItem>[] }>()
);

export const deleteCurrentOrderItem = createAction('[CurrentOrderItem/API] Delete CurrentOrderItem', props<{ id: string }>());

export const deleteCurrentOrderItems = createAction('[CurrentOrderItem/API] Delete CurrentOrderItems', props<{ ids: string[] }>());

export const clearCurrentOrderItems = createAction('[CurrentOrderItem/API] Clear CurrentOrderItems');
