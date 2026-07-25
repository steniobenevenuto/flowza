import axios from "axios";


const api = axios.create({

  baseURL:
  "https://flowza-production-9b03.up.railway.app",

});



api.interceptors.request.use((config)=>{


const token = localStorage.getItem("token");


console.log(
  "🔥 AXIOS TOKEN:",
  token
);



if(token){

  config.headers.Authorization =
  `Bearer ${token}`;

}



console.log(
  "🔥 HEADER FINAL:",
  config.headers
);



return config;


});



export default api;