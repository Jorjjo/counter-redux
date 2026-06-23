import { useState } from 'react';
import styles from './App.module.css';
import { Input } from '../input/Input';
import { Button } from '../button/Button';

type SetterProps = {
    onSetMinMax: () => void;
    onStartChange: (startValue: number) => void;
    onMaxChange: (maxValue: number) => void;
    onChange: () => void;
    maxValue: number;
    minValue: number;
};
export function CounterSetter({
    onSetMinMax,
    onStartChange,
    onMaxChange,
    onChange,
    minValue,
    maxValue,
}: SetterProps) {
    const [startValueError, setStartValueError] = useState<string | null>(null);
    const [maxValueError, setMaxValueError] = useState<string | null>(null);

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
        onStartChange(value);
        onChange();

        if (value >= maxValue || value < 0) {
            setStartValueError('error');
            return;
        }
        resetError();
    };

    const handleMaxChange = (value: number) => {
        onMaxChange(value);
        onChange();
        if (value <= minValue || value <= 0) {
            setMaxValueError('error');

            return;
        }
        resetError();
    };

    const onBtnClick = () => {
        onStartChange(minValue);
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
