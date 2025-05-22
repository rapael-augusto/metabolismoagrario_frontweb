"use client";

import "@/styles/home/homepage.css";
import Modulo from "@/components/home/module";
import Layout from "@/components/layout/layout";
import { FaGavel } from "react-icons/fa";
import { useAuthContext } from "@/contexts/auth/authContext";
import { redirect } from "next/navigation";

const Home = () => {
	const { user } = useAuthContext();

	if (!user) return;
	
	const renderLayout = () => {
		console.log("Role no renderLayout:", user.role);
		if (user.role === "ADMIN") {
			return (
				<>
					<Modulo URL="/crops" text="Culturas" imageUrl="/vaso.svg" />
					<Modulo URL="/usersList" text="Usuários" imageUrl="/account.svg" />
					<Modulo
						URL="/calculator"
						text="Calculadora"
						imageUrl="/calculate.svg"
					/>
					<Modulo URL="/reviews" text="Solicitações" icon={FaGavel} />
				</>
			);
		} else {
			return (
				<>
					<Modulo URL="/crops" text="Culturas" imageUrl="/vaso.svg" />
					<Modulo
						URL="/calculator"
						text="Calculadora"
						imageUrl="/calculate.svg"
					/>
					<Modulo URL="/reviews" text="Minhas Solicitações" icon={FaGavel} />
				</>
			);
		}
	};

	return (
		<Layout>
			<div className="homepage-box">{renderLayout()}</div>
		</Layout>
	);
};

export default Home;
