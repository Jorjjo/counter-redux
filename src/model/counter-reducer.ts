import { createAction, createReducer } from '@reduxjs/toolkit';
export type Counter = {
    maxValue: number;
    startValue: number;
    count: number;
    btnsDisabled: boolean;
};
const initialState: Counter = {
    count: 0,
    startValue: 0,
    maxValue: 1,
    btnsDisabled: false,
};

export const resetCountToStartAC = createAction('counter/resetCountToStart');
export const setBtnDiasabledAC = createAction('counter/setBtnDiasabled');
export const incrementCountAC = createAction('counter/incrementCount');
export const setStartValueAC = createAction<{ newValue: number }>(
    'counter/setStartValue',
);
export const setMinValueAC = createAction<{ newValue: number }>(
    'counter/setMinValue',
);

export const counterReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setBtnDiasabledAC, (state) => {
            state.btnsDisabled = false;
        })
        .addCase(resetCountToStartAC, (state) => {
            setBtnDiasabledAC();
            state.count = state.startValue;
        })
        .addCase(incrementCountAC, (state) => {
            if (state.count >= state.maxValue) {
                return;
            }

            state.count++;
        })
        .addCase(setStartValueAC, (state, action) => {
            state.startValue = action.payload.newValue;
        })
        .addCase(setMinValueAC, (state, action) => {
            state.maxValue = action.payload.newValue;
        });
});
