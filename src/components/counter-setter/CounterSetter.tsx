import { useState } from 'react';
import styles from './App.module.css';
import { Input } from '../input/Input';
import { Button } from '../button/Button';

type SetterProps = {
    onSetMinMax: () => void;
    baseMaxValue: number;
    baseStartValue: number;
    onStartChange: (startValue: number) => void;
    onMaxChange: (maxValue: number) => void;
    onChange: () => void;
};
export function CounterSetter({
    onSetMinMax,
    baseMaxValue,
    baseStartValue,
    onStartChange,
    onMaxChange,
    onChange,
}: SetterProps) {
    const [startValue, setStartValue] = useState(baseStartValue);
    const [maxValue, setMaxValue] = useState(baseMaxValue);
    const [startValueError, setStartValueError] = useState<string | null>(null);
    const [maxValueError, setMaxValueError] = useState<string | null>(null);
    console.log('1', startValue);

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
        setStartValue(value);
        onChange();

        if (value >= maxValue || value < 0) {
            setStartValueError('error');
            return;
        }
        resetError();
    };

    const handleMaxChange = (value: number) => {
        setMaxValue(value);
        onChange();
        if (value <= startValue || value <= 0) {
            setMaxValueError('error');

            return;
        }
        resetError();
    };

    const onBtnClick = () => {
        onStartChange(startValue);
        onMaxChange(maxValue);
        onSetMinMax();
    };

    return (
        <div className={'box flex-col'}>
            <div className={styles.counterDisplay}>
                <div className={styles.inputWrapper}>
                    <h2 className={styles.inputTitle}>min value:</h2>
                    <Input
                        error={startValueError}
                        value={startValue}
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
