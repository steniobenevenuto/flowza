import axios from "axios";


const api = axios.create({

    baseURL: "https://flowza-production-9b03.up.railway.app",

    headers: {
        "Content-Type": "application/json"
    }

});



api.interceptors.request.use((config)=>{


    const token = localStorage.getItem("token");


    console.log("TOKEN ENVIADO:", token);



    if(token){

        config.headers = config.headers || {};

        config.headers.Authorization =
            `Bearer ${token}`;

    }


    return config;


});


export default api;