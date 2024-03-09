import inputDefaultType from "@/types/inputType";

const InputDefault : React.FC<inputDefaultType> = ({classe,label,onChange,value,placeholder,type}) => {
    return ( 
        <div className={classe}>
          <label htmlFor={label}>{label}</label>
          <input type={type} id={label} value={value} onChange={onChange} placeholder={placeholder}  />
        </div>
    );
}
 
export default InputDefault;