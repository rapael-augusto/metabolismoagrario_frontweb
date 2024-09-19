import React from "react";
import "../../styles/layout/navButton.css"
import Link from "next/link";
import Image from "next/image";

interface navButtonParams {
    Url: string
    type: "voltar" | "cadastrar"
    text: string
    page: "list" | "form"
}

const NavButton: React.FC<navButtonParams> = ({ Url, text, type, page }) => {
    return (
        <button className={`navButton-${type}-${page}`} type="button" onClick={() => window.location.href = Url}>
            {type === 'voltar'}
            {text}
        </button>
    );
}

export default NavButton;