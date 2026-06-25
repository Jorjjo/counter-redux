import { useState } from 'react';
import styles from './App.module.css';
import { Input } from '../input/Input';
import { Button } from '../button/Button';
import { useAppDispatch } from '../../common/hooks/useAppDispatch';
import {
    setBtnDiasabledAC,
    setMaxValueAC,
    setStartValueAC,
} from '../../model/counter-reducer';

type SetterProps = {
    onSetMinMax: () => void;
    maxValue: number;
    minValue: number;
};
export function CounterSetter({
    onSetMinMax,
    minValue,
    maxValue,
}: SetterProps) {
    const [startValueError, setStartValueError] = useState<string | null>(null);
    const [maxValueError, setMaxValueError] = useState<string | null>(null);

    const dispatch = useAppDispatch();

    const getIsBtnDisabled = () => {
        let isBtnDisabled = false;
        if (startValueError || maxValueError) {
            return (isBtnDisabled = true);
        }
        return isBtnDisabled;
    };

    const resetError = () => {
        setStartValueError(null);
        setMaxValueError(null);
    };

    const handleStartChange = (value: number) => {
        dispatch(setStartValueAC({ newValue: value }));
        dispatch(setBtnDiasabledAC());

        if (value >= maxValue || value < 0) {
            setStartValueError('error');
            return;
        }
        resetError();
    };

    const handleMaxChange = (value: number) => {
        dispatch(setMaxValueAC({ newValue: value }));
        dispatch(setBtnDiasabledAC());
        if (value <= minValue || value <= 0) {
            setMaxValueError('error');

            return;
        }
        resetError();
    };

    const onBtnClick = () => {
        dispatch(setStartValueAC({ newValue: minValue }));
        dispatch(setMaxValueAC({ newValue: maxValue }));
        onSetMinMax();
    };

    return (
        <div className={'box flex-col'}>
            <div className={styles.counterDisplay}>
                <div className={styles.inputWrapper}>
                    <h2 className={styles.inputTitle}>min value:</h2>
                    <Input
                        error={startValueError}
                        value={minValue}
                        onChange={handleStartChange}
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <h2 className={styles.inputTitle}>max value:</h2>
                    <Input
                        error={maxValueError}
                        value={maxValue}
                        onChange={handleMaxChange}
                    />
                </div>
            </div>
            <div className={'btnsWrapper'}>
                <Button
                    onClick={onBtnClick}
                    title='set'
                    isDisabled={getIsBtnDisabled()}
                />
            </div>
        </div>
    );
}
