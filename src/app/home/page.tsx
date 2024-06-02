"use client";

import "../../styles/home/homepage.css"
import SecurityComp from "@/components/auth/security";
import Modulo from "@/components/home/module";
import Layout from "@/components/layout/layout";


const Home = () => {

    return (
        <SecurityComp>
            <Layout>
                <div className="homepage-box">
                    <Modulo URL="/crops" text="Culturas" imageUrl="/culturasIcon.png" />
                    <Modulo URL="/usersList" text="Usuários" imageUrl="/userIcon.svg" />
                </div>
            </Layout>
        </SecurityComp>
    );

}

export default Home;