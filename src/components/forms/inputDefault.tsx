import inputDefaultType from "@/types/inputType";

const InputDefault : React.FC<inputDefaultType> = ({classe,label,onChange,value,placeholder,type, step}) => {
    return ( 
        <div className={classe}>
          <label htmlFor={label}>{label}</label>
          <input step={step} type={type} id={label} value={value} onChange={onChange} placeholder={placeholder}  />
        </div>
    );
}
 
export default InputDefault;