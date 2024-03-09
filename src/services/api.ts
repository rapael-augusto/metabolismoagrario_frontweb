import axios from "axios";

const url = process.env.API_URL

const Axios = axios.create({      
    baseURL: url || 'http://127.0.0.1:3333/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default Axios;