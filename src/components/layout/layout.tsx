import "@/styles/layout/layout.css";
import { Header } from "./header";
import { Footer } from "./footer";

const Layout: React.FC<any> = ({ children, isProfileVisible }) => {
  return (
    <div className="layout-box">
      <Header isProfileVisible={isProfileVisible} />
      <main className="container-centralizado">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
