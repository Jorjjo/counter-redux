import { useEffect, useState } from 'react';
import './App.css';
import { Counter } from '../components/counter/Counter';
import { CounterSetter } from '../components/counter-setter/CounterSetter';
import { useAppSelector } from '../common/hooks/useAppSelector';
import { selectCounter } from '../model/counter-selector';
import { useAppDispatch } from '../common/hooks/useAppDispatch';
import {
    incrementCountAC,
    resetCountToStartAC,
} from '../model/counter-reducer';

export type Tab = 'setter' | 'counter';

function App() {
    const [activeDisplay, setActiveDisplay] = useState<Tab>('counter');

    const counter = useAppSelector(selectCounter);
    const dispatch = useAppDispatch();
    // запускается толькко 1 раз при монтировании компонента(component didMount), выполняет ресет до стартового значения в правом баре
    useEffect(() => {
        dispatch(resetCountToStartAC());
    }, []);

    // handler для обнуления
    function resetCountToStart() {
        dispatch(resetCountToStartAC());

        setActiveDisplay('counter');
    }

    // handler для увеличения
    function incrementCount() {
        dispatch(incrementCountAC());
    }

    return (
        <div>
            {/* left setter */}
            {activeDisplay === 'setter' ? (
                <CounterSetter
                    // TODO не resetCountToStart, а функция (придумай имя), которая  делает сама resetCountToStart + выбирает нужную вкладку
                    onSetMinMax={resetCountToStart}
                    maxValue={counter.maxValue}
                    minValue={counter.startValue}
                />
            ) : null}

            {/* right +- */}
            {activeDisplay === 'counter' ? (
                <Counter
                    currentCount={counter.count}
                    incrementCount={incrementCount}
                    resetCount={resetCountToStart}
                    maxCount={counter.maxValue}
                    minCount={counter.startValue}
                    areBtnsDisabled={counter.btnsDisabled}
                    onSetButtonClick={() => {
                        setActiveDisplay('setter');
                    }}
                />
            ) : null}
        </div>
    );
}

export default App;
