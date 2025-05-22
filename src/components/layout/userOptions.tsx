import Link from "next/link";
import { useState } from "react";
import "@/styles/layout/dropdown.css";
import Image from "next/image";
import { useAuthContext } from "@/contexts/auth/authContext";

const UserOpt: React.FC = () => {
	const { user, logout } = useAuthContext();
	const [dropdownOpen, setDropdown] = useState<boolean>(false);

	function abrirDropDown() {
		setDropdown(!dropdownOpen);
	}

	return (
		<>
			<div
				className={`dropDown ${user ? "" : "d-none"}`}
				onClick={abrirDropDown}
			>
				<Image
					src={"/Profile.svg"}
					alt="icone perfil"
					width={28}
					height={28}
					style={{ marginRight: "8px" }}
				/>
				<span className="user-name">{user && user.name}</span>
				<Image
					src={"/setaHeader.svg"}
					alt="abrir ou fechar dropdown"
					width={13}
					height={13}
					className={`${dropdownOpen == true ? "activeIcon" : "inactiveIcon"}`}
				/>
			</div>

			<div
				className={`componente-dropdown ${
					dropdownOpen == true ? "active" : "inactive"
				} ${user ? "" : "d-none"}`}
			>
				<ul>
					<Link className="link" href={"/home"}>
						<li>Início</li>
					</Link>
					<li className="link" onClick={logout}>
						Sair
					</li>
				</ul>
			</div>
		</>
	);
};

export default UserOpt;
