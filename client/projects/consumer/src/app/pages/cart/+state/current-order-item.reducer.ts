import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CurrentOrderItem } from './current-order-item.model';
import * as CurrentOrderItemActions from './current-order-item.actions';

export const currentOrderItemsFeatureKey = 'currentOrderItems';

export interface State extends EntityState<CurrentOrderItem> {
  ids: string[];
  tip: number;
}

export const adapter: EntityAdapter<CurrentOrderItem> = createEntityAdapter<CurrentOrderItem>({
  selectId: (instance) => instance._id,
});

export const initialState: State = adapter.getInitialState({
  ids: [],
  tip: 0,
});

export const reducer = createReducer(
  initialState,
  on(CurrentOrderItemActions.addCurrentOrderItem, (state, action) => adapter.addOne(action.currentOrderItem, state)),
  on(CurrentOrderItemActions.upsertCurrentOrderItem, (state, action) => adapter.upsertOne(action.currentOrderItem, state)),
  on(CurrentOrderItemActions.addCurrentOrderItems, (state, action) => adapter.addMany(action.currentOrderItems, state)),
  on(CurrentOrderItemActions.upsertCurrentOrderItems, (state, action) => adapter.upsertMany(action.currentOrderItems, state)),
  on(CurrentOrderItemActions.updateCurrentOrderItem, (state, action) => adapter.updateOne(action.currentOrderItem, state)),
  on(CurrentOrderItemActions.updateCurrentOrderItems, (state, action) => adapter.updateMany(action.currentOrderItems, state)),
  on(CurrentOrderItemActions.deleteCurrentOrderItem, (state, action) => adapter.removeOne(action.id, state)),
  on(CurrentOrderItemActions.deleteCurrentOrderItems, (state, action) => adapter.removeMany(action.ids, state)),
  on(CurrentOrderItemActions.loadCurrentOrderItems, (state, action) => adapter.setAll(action.currentOrderItems, state)),
  on(CurrentOrderItemActions.clearCurrentOrderItems, (state) => adapter.removeAll(state))
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
