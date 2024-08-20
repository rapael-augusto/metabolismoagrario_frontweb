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
        <Link href={Url} className={`navButton-${type}-${page}`}>
            <button className={`navButton-${type}-${page}`} type="button">
                {type === 'voltar' && (
                    <Image
                        src={"/arrow_back_ios.svg"}
                        alt="voltar"
                        width={20}
                        height={20}
                        className="navButton-icon"
                    />
                )}
                {text}
            </button>
        </Link>

    );
}

export default NavButton;