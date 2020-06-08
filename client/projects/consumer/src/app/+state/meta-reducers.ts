import { MetaReducer } from '@ngrx/store';

import { clearStateMetaReducer, storageSyncMetaReducer } from 'dist/library';
import { environment } from '../../environments/environment';
import * as fromAppState from './reducers';

const sharedMetaReducers: MetaReducer<fromAppState.State>[] = [clearStateMetaReducer, storageSyncMetaReducer];

export const metaReducers: MetaReducer<fromAppState.State>[] = !environment.production ? [...sharedMetaReducers] : [...sharedMetaReducers];
