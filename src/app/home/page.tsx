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
                    <Modulo URL="/crops" text="crops module" />
                    <Modulo URL="/crops" text="crops module" />
                    <Modulo URL="/crops" text="crops module" />
                    <Modulo URL="/crops" text="crops module" />
                </div>
            </Layout>
        </SecurityComp>
    );

}

export default Home;