import { moduleType } from "@/types/modulo";
import "../../styles/home/modulo.css"
import Image from "next/image";


const Modulo: React.FC<moduleType> = ({ text, URL, imageUrl }) => {


    return (
        <a href={URL}>
            <div className="modulo-box">

                <Image
                    src={imageUrl}
                    alt=""
                    width={70}
                    height={70}
                />

                <div>
                    <h3>{text}</h3>
                </div>
            </div>
        </a>

    );
}

export default Modulo;