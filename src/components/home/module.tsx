import { moduleType } from "@/types/modulo";
import "../../styles/home/modulo.css";
import Image from "next/image";
import Link from "next/link";

const Modulo: React.FC<moduleType> = ({ text, URL, imageUrl }) => {
  return (
    <Link href={URL} className="modulo-box">
      <Image src={imageUrl} alt="" width={70} height={70} />

      <div>
        <h3>{text}</h3>
      </div>
    </Link>
  );
};

export default Modulo;
