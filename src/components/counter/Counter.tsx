import { Button } from '../button/Button';
import { CounterDisplay } from './counter-display/CounterDisplay';
// import styles from './Counter.module.css';

type CounterProps = {
    currentCount: number;
    incrementCount: () => void;
    resetCount: () => void;
    maxCount: number;
    minCount: number;
    arebtnsDisabled: boolean;
    onSetButtonClick: () => void;
};

export function Counter({
    currentCount,
    incrementCount,
    resetCount,
    maxCount,
    minCount,
    arebtnsDisabled,
    onSetButtonClick,
}: CounterProps) {
    const isIncrementBtnDisabled = currentCount >= maxCount || arebtnsDisabled;
    const isResetBtnDisabled = currentCount === minCount || arebtnsDisabled;
    return (
        <div className={'box flex-col'}>
            <CounterDisplay
                value={currentCount}
                maxCount={maxCount}
                currentCount={currentCount}
            />
            <div className={'btnsWrapper'}>
                <Button
                    onClick={incrementCount}
                    title='inc'
                    isDisabled={isIncrementBtnDisabled}
                />
                <Button
                    onClick={resetCount}
                    title='reset'
                    isDisabled={isResetBtnDisabled}
                />
                <Button onClick={onSetButtonClick} title='set' />
            </div>
        </div>
    );
}
