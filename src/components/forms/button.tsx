import buttonType from '@/types/buttonType';

const Button: React.FC<buttonType> = ({texto, classe }) => {
    return (
        <button className={classe}>
            {texto}
        </button>
    );
}
 
export default Button;