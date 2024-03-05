import Layout from "@/components/layout/layout";
import Button from "@/components/forms/button";
import '../styles/form/form.css'
import '../styles/home/login.css'

const Home = () => {
  return (
    <Layout>
      <form className="formBody-login">

        <div className="form-input-box">
           <h2 className="tittle-login">Bem-Vindo</h2>
        </div>

        <div className="form-input-box">
          <label htmlFor="email">E-mail</label>
          <input type="text" id="email" />
        </div>

        <div className="form-input-box">
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" />
        </div>

        <div className="form-input-box">
          <Button texto={'Entrar'} classe={'button-home'} />
        </div>
       
      </form>
    </Layout>
  );
}

export default Home;