
const Layout: React.FC<any> = ({children}) => {
  return (
    <>
      <header>[LOGO /MENU]</header>
      {children}
      <footer>[FIM PAGINA/REFERENCAIS]</footer>
    </>
  );
}

export default Layout;
