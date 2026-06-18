import styles from '../Counter.module.css';
type CounterDisplayProps = {
    value: number;
    className?: string;
    currentCount: number;
    maxCount: number;
};

function getBaseCountClassName() {
    return styles.count;
}

function getMaxCountClassName(currentCount: number, maxCount: number) {
    if (currentCount === maxCount) return styles.maxCount;
    return '';
}

export function CounterDisplay({
    value,
    currentCount,
    maxCount,
}: CounterDisplayProps) {
    const countClassName = `
        ${getBaseCountClassName()}
        ${getMaxCountClassName(currentCount, maxCount)}
    `;

    return (
        <div className={styles.counterDisplay}>
            <h1 className={countClassName}>{value}</h1>
        </div>
    );
}
