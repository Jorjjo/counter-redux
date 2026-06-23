import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { counterReducer } from '../model/counter-reducer';

const rootReducer = combineReducers({
    counter: counterReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store;
