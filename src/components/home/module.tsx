import { moduleType } from "@/types/modulo";
import "../../styles/home/modulo.css"

const Modulo: React.FC<moduleType> = ({text, URL }) => {

    return ( 
        <a href={URL}>
            <div className="modulo-box">
                {text}
            </div>
        </a>

    );
}
 
export default Modulo;