import React from 'react';
import buttonType from '../../types/buttonType';


const Button: React.FC<buttonType> = ({ texto, classe, onclick }) => {
    return (
        <button onClick={onclick} className={classe}>
            {texto}
        </button>
    );
}

export default Button;
