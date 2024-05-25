import UserOpt from './userOptions';
import { useEffect, useState } from 'react';
import '../../styles/layout/layout.css'
import Alert from './alert';


const Layout: React.FC<any> = ({children}) => {
  const [sessao,setSessao] = useState <string | any>('') 
  const [userName,setUserName] = useState <string | any>('')

  useEffect(()=>{
    let token = sessionStorage.getItem('@token')
    let user = sessionStorage.getItem('user')

    setSessao(token)
    setUserName(user)
  },[])
  
  return (
    <div className='layout-box'>
      <header className="header-box">
        <div className='header-logo-box'>
            [LOGO APP]
        </div>
        <div className='header-menu-box'>
            <ul className='menu-box'> 
              <UserOpt token={sessao} userLogado={userName} />
            </ul>
        </div>
      </header>
      <Alert />
      {children}
      <footer className="footer-box" >
          <div className='footer-logo-box'>
            [LOGO APP]
          </div>
          <div className='footer-social-box'>
            [REDES SOCIAIS]
          </div>
      </footer>
    </div>
  );
}

export default Layout;
