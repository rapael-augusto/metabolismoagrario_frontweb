import Link from 'next/link';
import { useEffect, useState } from 'react';
import "../../styles/layout/dropdown.css"
import Image from 'next/image';


interface userSession {
    token: string | any
    userLogado: string | any
}

const UserOpt: React.FC<userSession> = ({ token, userLogado }) => {
    const [dropdownOpen, setDropdown] = useState<boolean>(false)


    function abrirDropDown() {
        setDropdown(!dropdownOpen)
    }

    function logout() {
        sessionStorage.clear()
        window.location.href = '/'
    }

    return (
        <>

            <li className={`dropDown ${token ? '' : 'd-none'}`} onClick={abrirDropDown}>
                <Image
                    src={"/Profile.svg"}
                    alt="icone perfil"
                    width={18}
                    height={18}
                    style={{ marginRight: '8px' }}
                />
                <span className='user-name'>{userLogado}</span>
                <Image
                    src={"/setaHeader.svg"}
                    alt="abrir ou fechar dropdown"
                    width={13}
                    height={13}
                    className={`${dropdownOpen == true ? 'activeIcon' : 'inactiveIcon'}`}
                />
            </li>

            <div className={`componente-dropdown ${dropdownOpen == true ? 'active' : 'inactive'} ${token ? '' : 'd-none'}`}>
                <ul>
                    <Link className='link' href={"/home"}><li>Início</li></Link>
                    <li className='link' onClick={logout}>
                        Sair
                    </li>
                </ul>
            </div>
        </>
    );
}

export default UserOpt;