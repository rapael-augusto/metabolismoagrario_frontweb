import React from "react";
import "../../styles/layout/navButton.css"
import Link from "next/link";

interface navButtonParams {
    Url: string
    type: "voltar" | "cadastrar" 
    text: string
    page: "list" | "form"
}

const NavButton: React.FC<navButtonParams> = ({Url,text,type,page}) => {
    return (
        <Link href={Url}>
            <button className={`navButton-${type}-${page}`} type="button">
                {text}
            </button>
        </Link>

    );
}

export default NavButton;