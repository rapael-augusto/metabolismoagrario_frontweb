import "@/styles/layout/layout.css";
import { Header } from "./header";
import { Footer } from "./footer";
import { Suspense, useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/auth/authContext";

const Layout: React.FC<any> = ({ children }) => {
	
	return (
		<div className="layout-box">
			<Header />
			<main className="container-centralizado">{children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
