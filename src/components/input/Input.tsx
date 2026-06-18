import type { ChangeEvent } from 'react';
import styles from './Input.module.css';

type Props = {
    error: string | null;
    value: number;
    onChange: (value: number) => void;
};

function getBaseClassName() {
    return styles.input;
}

function getErrorClassName(error: string | null) {
    if (error) return styles.error;
    return '';
}
export function Input(props: Props) {
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.onChange(Number(event.currentTarget.value));
    };

    const inputClassName = `
      ${getBaseClassName()}
      ${getErrorClassName(props.error)}
      `;

    return (
        <input
            className={inputClassName}
            type='number'
            value={props.value}
            onChange={onChangeInputHandler}
        />
    );
}
