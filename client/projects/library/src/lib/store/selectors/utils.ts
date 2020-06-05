import { createSelector, Selector, MemoizedSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

/** Selects entity from entities list using prvoided id */
export function selectById<Result, State = Dictionary<Result>, S1 = Dictionary<Result>>(
  entities: Selector<State, S1>
): (id: string) => MemoizedSelector<State, Result> {
  return function selectByIdFn(id: string) {
    return createSelector<State, S1, Result>(entities, (state: S1) => state[id]);
  };
}

/** Selects entity by from entities list using ids */
export function selectEntityByIndex<Result, State = Dictionary<Result>, S1 = Dictionary<Result>, S2 = number[] | string[]>(
  entities: Selector<State, S1>,
  ids: Selector<State, S2>,
  index: number
): MemoizedSelector<State, Result> {
  return entities[ids[index]];
}

/** Selects first entity from entities list using ids */
export function selectFirstEntity<Result, State = Dictionary<Result>, S1 = Dictionary<Result>, S2 = number[] | string[]>(
  entities: Selector<State, S1>,
  ids: Selector<State, S2>
): MemoizedSelector<State, Result> {
  return selectEntityByIndex(entities, ids, 0);
}

/** Selects last entity from entities list using ids */
export function selectLastEntity<Result, State = Dictionary<Result>, S1 = Dictionary<Result>, S2 = number[] | string[]>(
  entities: Selector<State, S1>,
  ids: Selector<State, S2>
): MemoizedSelector<State, Result> {
  return selectEntityByIndex(entities, ids, ids.length - 1);
}
