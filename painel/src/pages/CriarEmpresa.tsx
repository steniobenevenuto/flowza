import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";


export default function CriarEmpresa(){


const navigate = useNavigate();


const [form,setForm] = useState({

    nomeEmpresa:"",
    segmento:"",
    telefoneWhatsapp:""

});



function alterar(e:any){


setForm({

    ...form,

    [e.target.name]:e.target.value

});


}





async function criar(){


console.log(
    "CRIAR EMPRESA TOKEN:",
    localStorage.getItem("token")
);


console.log(
    "FORM EMPRESA:",
    form
);



try{


const resposta = await api.post(

    "/empresa",

    form

);



console.log(
    "RESPOSTA EMPRESA:",
    resposta.data
);



localStorage.setItem(

    "empresaId",

    String(resposta.data.id)

);



localStorage.setItem(

    "empresaNome",

    resposta.data.nome

);



alert(
    "Empresa criada com sucesso 🚀"
);



navigate("/dashboard");



}catch(error:any){


console.log(
    "ERRO EMPRESA:",
    error
);



alert(

error.response?.data?.erro ||

"Erro ao criar empresa"

);


}


}







return(


<div className="min-h-screen flex items-center justify-center bg-gray-100">


<div className="bg-white p-8 rounded-xl shadow-xl w-[420px]">



<h1 className="text-3xl font-bold mb-3 text-center">

🏢 Criar Empresa

</h1>



<p className="text-gray-500 text-center mb-8">

Configure seu espaço no AutoAtende

</p>





<input

className="w-full border p-3 rounded-lg mb-4"

name="nomeEmpresa"

placeholder="Nome da empresa"

value={form.nomeEmpresa}

onChange={alterar}

/>







<input

className="w-full border p-3 rounded-lg mb-4"

name="segmento"

placeholder="Segmento (ex: imobiliária)"

value={form.segmento}

onChange={alterar}

/>







<input

className="w-full border p-3 rounded-lg mb-6"

name="telefoneWhatsapp"

placeholder="WhatsApp conectado"

value={form.telefoneWhatsapp}

onChange={alterar}

/>







<button

onClick={criar}

className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-bold"

>

Criar minha empresa 🚀

</button>




</div>


</div>


);


}