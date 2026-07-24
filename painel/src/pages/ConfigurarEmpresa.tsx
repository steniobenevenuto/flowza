import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";



export default function ConfigurarEmpresa(){


const navigate = useNavigate();




const [form,setForm] = useState({

    mensagemInicial:"",

    horarioFuncionamento:"",

    endereco:"",

    instagram:"",

    site:""

});







function alterar(e:any){


    setForm({

        ...form,

        [e.target.name]:e.target.value

    });


}










async function salvar(){


try{


    const empresaId = localStorage.getItem(

        "empresaId"

    );



    if(!empresaId){


        alert(

            "Empresa não encontrada"

        );


        return;


    }






    await api.put(

        `/empresa/${empresaId}`,

        form

    );





    alert(

        "Configuração salva com sucesso 🚀"

    );





    navigate("/dashboard");






}catch(error:any){



    console.log(

        error.response?.data

    );



    alert(

        error.response?.data?.erro ||

        "Erro ao salvar configuração"

    );


}



}









return(



<div className="

min-h-screen

bg-zinc-900

flex

items-center

justify-center

p-6

">





<div className="

bg-zinc-800

border

border-zinc-700

rounded-2xl

shadow-2xl

p-8

max-w-xl

w-full

">







<h1 className="

text-3xl

font-bold

text-white

mb-3

">


⚙️ Configurar sua empresa


</h1>






<p className="

text-zinc-400

mb-8

">


Defina as informações que a Flowza usará
para automatizar seus atendimentos.


</p>









<textarea


className="

w-full

bg-zinc-900

border

border-zinc-700

text-white

rounded-xl

px-4

py-3

mb-4

h-32

outline-none

focus:border-blue-500

"



name="mensagemInicial"



placeholder="Mensagem inicial do WhatsApp"



value={form.mensagemInicial}



onChange={alterar}


/>









<input


className="

w-full

bg-zinc-900

border

border-zinc-700

text-white

rounded-xl

px-4

py-3

mb-4

outline-none

focus:border-blue-500

"



name="horarioFuncionamento"



placeholder="Horário de funcionamento"



value={form.horarioFuncionamento}



onChange={alterar}


/>









<input


className="

w-full

bg-zinc-900

border

border-zinc-700

text-white

rounded-xl

px-4

py-3

mb-4

outline-none

focus:border-blue-500

"



name="endereco"



placeholder="Endereço (opcional)"



value={form.endereco}



onChange={alterar}


/>









<input


className="

w-full

bg-zinc-900

border

border-zinc-700

text-white

rounded-xl

px-4

py-3

mb-4

outline-none

focus:border-blue-500

"



name="instagram"



placeholder="Instagram (opcional)"



value={form.instagram}



onChange={alterar}


/>









<input


className="

w-full

bg-zinc-900

border

border-zinc-700

text-white

rounded-xl

px-4

py-3

mb-6

outline-none

focus:border-blue-500

"



name="site"



placeholder="Site (opcional)"



value={form.site}



onChange={alterar}


/>









<button


onClick={salvar}



className="

w-full

bg-blue-600

hover:bg-blue-700

text-white

p-3

rounded-xl

font-bold

transition

"


>


Finalizar configuração 🚀


</button>







</div>





</div>



);


}