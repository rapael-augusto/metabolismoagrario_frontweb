"use client";


import SecurityComp from "@/components/auth/security";
import Layout from "@/components/layout/layout";

const Home = () => {

    return (
        <SecurityComp>
             <Layout>
                 [HOME VIEW]
             </Layout>
        </SecurityComp>
    );
    
    
}
 
export default Home;