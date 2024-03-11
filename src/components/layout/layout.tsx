import '../../styles/layout/layout.css'

const Layout: React.FC<any> = ({children}) => {
  return (
    <div className='layout-box'>
      <header className="header-box">
        <div className='header-logo-box'>
            [LOGO APP]
        </div>
        <div className='header-menu-box'>
            <ul className='menu-box'>
              <li>Início</li>
              <li>Sobre</li>
            </ul>
        </div>
      </header>
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
