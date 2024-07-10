import React from "react";
import "../../styles/form/input.css"
import inputDefaultType from "@/types/inputType";

const InputDefault: React.FC<inputDefaultType> = ({ classe, label, onChange, value, placeholder, type, step }) => {
    return (
        <div className={`inputDefault-container ${classe}`}>
            <label className="inputDefault-label" htmlFor={label}>{label}</label>
            <input className="inputDefault-input" step={step} type={type} id={label} value={value} onChange={onChange} placeholder={placeholder} />
        </div>
    );
}

export default InputDefault;
