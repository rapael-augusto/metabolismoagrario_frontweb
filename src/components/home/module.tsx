import { moduleType } from "@/types/modulo";
import "@/styles/home/modulo.css";
import Image from "next/image";
import Link from "next/link";

const Modulo: React.FC<moduleType> = ({ text, URL, imageUrl, icon: Icon }) => {
	return (
		<Link href={URL} className="modulo-box">
			{imageUrl && !Icon && (
				<Image src={imageUrl} alt="" width={70} height={70} />
			)}
			{Icon && !imageUrl && <Icon size={"70px"} />}
			<div>
				<h3>{text}</h3>
			</div>
		</Link>
	);
};

export default Modulo;