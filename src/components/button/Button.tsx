import styles from './Button.module.css';

type ButtonProps = {
    title: string;
    onClick: () => void;
    isDisabled?: boolean;
};

function getBaseClassName() {
    return styles.button;
}

function getDisabledClassName(disabled: boolean | undefined) {
    if (disabled) return styles.disabled;

    return '';
}

export function Button({ title, onClick, isDisabled }: ButtonProps) {
    const buttonClassName = `
        ${getBaseClassName()}
        ${getDisabledClassName(isDisabled)}
    `;

    // console.log(styles);
    
    return (
        <button
            className={buttonClassName}
            disabled={isDisabled}
            onClick={onClick}
        >
            {title}
        </button>
    );
}
