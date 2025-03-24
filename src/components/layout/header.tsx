"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import UserOpt from "./userOptions";
import Styles from "@/styles/layout/header.module.css";
import { useAuthContext } from "@/contexts/auth/authContext";

export const Header: React.FunctionComponent = () => {
	const { user } = useAuthContext();
	return (
		<React.Fragment>
			<div className={Styles.header}>
				<div
					className={`${Styles.mainHeader} ${
						user?.name ? "" : Styles.onlyLogo
					}`}
				>
					<Link href={`${user ? "/home" : "/"}`} className={Styles.logoWrapper}>
						<Image
							src="/logo_provisoriaHeader.svg"
							alt="Logo"
							width={50}
							height={50}
						/>
						<p className={Styles.logoTitle}>Metabolismo Agrário</p>
					</Link>
					<div className={Styles.menuWrapper}>
						<ul className={Styles.listItem}>
							<UserOpt />
						</ul>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};
