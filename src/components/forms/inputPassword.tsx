import React, { useState } from "react";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import styles from "@/styles/forgotPassword/resetPassword.module.css";

interface inputPasswordType
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

const InputPassword: React.FC<inputPasswordType> = ({ label, ...props }) => {
	const [isShow, setIsShow] = useState(false);
	const handlePass = () => setIsShow(!isShow);

	return (
		<div>
			<label className={styles.inputPassLabel}>{label ?? ""}</label>
			<div className={styles.area}>
				<input
					{...props}
					className={styles.inputPass}
					type={isShow ? "text" : "password"}
				/>
				<button type="button" className={styles.eye} onClick={handlePass}>
					{isShow && <VscEyeClosed size={24} />}
					{!isShow && <VscEye size={24} />}
				</button>
			</div>
		</div>
	);
};

export default InputPassword;
