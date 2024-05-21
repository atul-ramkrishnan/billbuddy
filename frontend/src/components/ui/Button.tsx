import React from 'react';

interface IButtonProps {
    text: string;
    onClick: () => void;
    icon?: string;
    btnStyle?: string;
}

const Button: React.FC<IButtonProps> = ({
    text,
    onClick,
    icon,
    btnStyle = 'btn-default'

}) => {
        const glyphIcon = icon ? <span className={`glyphicon ${icon}`}/> : '';
        return (
            <button className={`btn ${btnStyle}`} type="button" onClick={onClick}>
                {glyphIcon} {text}
            </button>
        );
};

export default Button;