
import type { RootState } from '../app/store';
import type { Counter } from './counter-reducer';

export const selectCounter = (state: RootState): Counter => state.counter;
