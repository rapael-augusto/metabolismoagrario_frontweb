import "../../styles/layout/layout.css";
import Alert from "./alert";
import { Header } from "./header";
import { Footer } from "./footer";

const Layout: React.FC<any> = ({ children }) => {
  return (
    <div className="layout-box">
      <Header />
      <Alert />
      <main className="container-centralizado">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
