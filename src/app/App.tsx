import { useEffect, useState } from 'react';
import './App.css';
import { Counter } from '../components/counter/Counter';
import { CounterSetter } from '../components/counter-setter/CounterSetter';
// import styles from './App.module.css';
// import { Input } from './components/input/Input';
// import { Button } from './components/button/Button';
// import { Button } from './components/button/Button';

// const
const baseStartValue = 0;
const baseMaxValue = 1;

// local storage
function getStartValueFromLocal() {
    const startValue = localStorage.getItem('minValue');
    if (!startValue) return;

    const startValueParsed = JSON.parse(startValue);
    if (typeof startValueParsed !== 'number') return;

    return startValueParsed;
}

function getMaxValueFromLocal() {
    const maxValue = localStorage.getItem('maxValue');

    if (!maxValue) return;

    const maxValueParsed = JSON.parse(maxValue);
    if (typeof maxValueParsed !== 'number') return;

    return maxValueParsed;
}

function setStartValueToLocal(newValue: number) {
    localStorage.setItem('minValue', JSON.stringify(newValue));
}

function setMaxValueToLocal(newValue: number) {
    localStorage.setItem('maxValue', JSON.stringify(newValue));
}

type Tab = 'setter' | 'counter';

function App() {
    const [count, setCount] = useState(baseStartValue);
    const [btnsDisabled, setBtnDiasabled] = useState(false);
    const [activeDisplay, setActiveDisplay] = useState<Tab>('counter');

    // запускается толькко 1 раз при монтировании компонента(component didMount), выполняет ресет до стартового значения в правом баре
    useEffect(() => {
        resetCountToStart();
    }, []);

    // тру гетеры, не local storage
    function getStartValue() {
        const valueFromLocal = getStartValueFromLocal();

        if (valueFromLocal) return valueFromLocal;

        return baseStartValue;
    }

    function getMaxValue() {
        const valueFromLocal = getMaxValueFromLocal();
        if (valueFromLocal) return valueFromLocal;
        return baseMaxValue;
    }

    // handler для обнуления
    function resetCountToStart() {
        const startValue = getStartValueFromLocal();
        setBtnDiasabled(false);

        if (typeof startValue === 'undefined') {
            console.error('ERROR! No startValue in local storage');
            return;
        }
        setActiveDisplay('counter');
        setCount(startValue);
    }

    function handleMessageOnChange() {
        setBtnDiasabled(true);
    }

    // handler для увеличения
    function incrementCount() {
        const maxValue = getMaxValueFromLocal();

        if (typeof maxValue === 'undefined') {
            console.error('ERROR! No maxValue in local storage');
            return;
        }

        if (count >= maxValue) {
            return;
        }

        setCount(count + 1);
    }

    return (
        <div>
            {/* left setter */}
            {activeDisplay === 'setter' ? (
                <CounterSetter
                    // TODO не resetCountToStart, а функция (придумай имя), которая  делает сама resetCountToStart + выбирает нужную вкладку
                    onSetMinMax={resetCountToStart}
                    baseMaxValue={getMaxValue()}
                    baseStartValue={getStartValue()}
                    onStartChange={setStartValueToLocal}
                    onMaxChange={setMaxValueToLocal}
                    onChange={handleMessageOnChange}
                />
            ) : null}

            {/* right +- */}
            {activeDisplay === 'counter' ? (
                <Counter
                    currentCount={count}
                    incrementCount={incrementCount}
                    resetCount={resetCountToStart}
                    maxCount={getMaxValue()}
                    minCount={getStartValue()}
                    arebtnsDisabled={btnsDisabled}
                    onSetButtonClick={() => {
                        setActiveDisplay('setter');
                    }}
                />
            ) : null}
        </div>
    );
}

export default App;
