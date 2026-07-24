import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../services/api";


export default function Cadastro(){


    const navigate = useNavigate();



    const [nome,setNome] = useState("");

    const [email,setEmail] = useState("");

    const [senha,setSenha] = useState("");

    const [confirmar,setConfirmar] = useState("");






    async function cadastrar(){


        if(!nome || !email || !senha){


            alert("Preencha todos os campos");

            return;


        }




        if(senha !== confirmar){


            alert("As senhas não conferem");

            return;


        }





        try{


            await api.post(

                "/auth/register",

                {

                    nome,

                    email,

                    senha

                }

            );



            alert("Conta criada com sucesso 🚀");



            navigate("/");




        }catch(error:any){


            console.log(error);



            alert(

                error.response?.data?.erro ||

                "Erro ao criar conta"

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

w-96

p-8

">






<div className="text-center mb-8">



<h1 className="

text-4xl

font-bold

text-white

">


Flowza


</h1>




<p className="

text-zinc-400

mt-2

">


Automação inteligente para seu negócio


</p>



</div>








<h2 className="

text-xl

font-bold

text-white

mb-5

">


Criar sua conta


</h2>









<input


className="

w-full

bg-zinc-900

border

border-zinc-700

text-white

px-4

py-3

rounded-xl

mb-3

outline-none

focus:border-blue-500

"


placeholder="Nome"



value={nome}



onChange={e=>
setNome(e.target.value)
}



/>







<input


className="

w-full

bg-zinc-900

border

border-zinc-700

text-white

px-4

py-3

rounded-xl

mb-3

outline-none

focus:border-blue-500

"


placeholder="Email"



value={email}



onChange={e=>
setEmail(e.target.value)
}



/>









<input


className="

w-full

bg-zinc-900

border

border-zinc-700

text-white

px-4

py-3

rounded-xl

mb-3

outline-none

focus:border-blue-500

"


type="password"


placeholder="Senha"



value={senha}



onChange={e=>
setSenha(e.target.value)
}



/>









<input


className="

w-full

bg-zinc-900

border

border-zinc-700

text-white

px-4

py-3

rounded-xl

mb-5

outline-none

focus:border-blue-500

"


type="password"


placeholder="Confirmar senha"



value={confirmar}



onChange={e=>
setConfirmar(e.target.value)
}



/>










<button


onClick={cadastrar}


className="

w-full

bg-blue-600

hover:bg-blue-700

text-white

py-3

rounded-xl

font-bold

transition

"


>


Criar conta 🚀


</button>







<div className="

text-center

mt-6

">


<Link


to="/"


className="

text-blue-400

hover:text-blue-300

"


>


Já possui uma conta? Entrar


</Link>



</div>






</div>





</div>



);


}