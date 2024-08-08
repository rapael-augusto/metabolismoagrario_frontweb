import UserOpt from './userOptions';
import { useEffect, useState } from 'react';
import '../../styles/layout/layout.css'
import Alert from './alert';
import Image from 'next/image';


const Layout: React.FC<any> = ({ children }) => {
  const [sessao, setSessao] = useState<string | any>('')
  const [userName, setUserName] = useState<string | any>('')

  useEffect(() => {
    let token = sessionStorage.getItem('@token')
    let user = sessionStorage.getItem('user')

    setSessao(token)
    setUserName(user)
  }, [])

  return (
    <div className='layout-box'>
      <header className="header-box">
        <div className='header-logo-box'>
          <Image src="/logo_provisoriaHeader.svg" alt="Logo" width={50} height={50} />
          <p className='logo-sistema-nome'>Metabolismo Agrário</p>
        </div>
        <div className='header-menu-box'>
          <ul className='menu-box'>
            <UserOpt token={sessao} userLogado={userName} />
          </ul>
        </div>
      </header>
      <Alert />


      <main className="container-centralizado">
        {children}
      </main>


      <footer className="footer-box" >
        <div className={`container-centralizado logos`}>

          <div className='logo-sistema'>
            <Image
              src={"/logo_provisoria.svg"}
              alt="logo metabolismo agrário"
              width={50}
              height={50}
              className="log-metabolismo-agrário"
            />
            <p className='logo-sistema-nome'>Metabolismo <br /> Agrário</p>
          </div>

          <div className='logos-faculdade'>
            <Image
              src={"/logo_ufape.svg"}
              alt="logo lmts"
              width={77.78}
              height={77.78}
              className="logo-ufape"
            />

            <Image
              src={"/logo_lmts.svg"}
              alt="logo lmts"
              width={104.7}
              height={45.89}
              className="logo-lmts"
            />
          </div>

          <div className='redes-sociais'>
            <Image
              src={"/logo_email.svg"}
              alt="logo lmts"
              width={30}
              height={30}
              className="logo-facebook"
            />

            <Image
              src={"/logo_facebook.svg"}
              alt="logo lmts"
              width={30}
              height={30}
              className="logo-facebook"
            />

            <Image
              src={"/logo_instagram.svg"}
              alt="logo lmts"
              width={30}
              height={30}
              className="logo-facebook"
            />
          </div>

        </div>
      </footer>
    </div>
  );
}

export default Layout;
