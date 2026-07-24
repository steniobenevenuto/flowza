import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


export default function Empresas(){


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








    async function cadastrar(){


        try{


            // cria empresa

            const resposta = await api.post(

                "/empresa",

                form

            );





            // recupera login salvo

            const email = localStorage.getItem("email");

            const senha = localStorage.getItem("senha");






            // gera token atualizado com empresaId

            if(email && senha){


                const login = await api.post(

                    "/auth/login",

                    {

                        email,

                        senha

                    }

                );



                localStorage.setItem(

                    "token",

                    login.data.token

                );



                localStorage.setItem(

                    "empresaId",

                    String(

                        login.data.empresa.id

                    )

                );



                localStorage.setItem(

                    "empresaNome",

                    login.data.empresa.nome

                );


            }





            // salva dados empresa

            localStorage.setItem(

                "empresaId",

                String(resposta.data.id)

            );



            localStorage.setItem(

                "empresaNome",

                resposta.data.nome

            );



            localStorage.setItem(

                "empresaSegmento",

                resposta.data.segmento

            );






            alert(

                "Empresa criada com sucesso 🚀"

            );





            navigate("/dashboard");






        }catch(error:any){



            console.log(

                "ERRO CRIAR EMPRESA:",

                error.response?.data

            );



            alert(

                error.response?.data?.erro ||

                "Erro ao criar empresa"

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

w-[500px]

">








<div className="mb-8">





<h1 className="

text-3xl

font-bold

text-white

">


🚀 Criar empresa


</h1>





<p className="

text-zinc-400

mt-3

">


Configure sua empresa para começar a usar a Flowza.


</p>



</div>








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


name="nomeEmpresa"



placeholder="Nome da empresa"



value={form.nomeEmpresa}



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


name="segmento"



placeholder="Segmento (ex: imobiliária, loja, serviço)"



value={form.segmento}



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


name="telefoneWhatsapp"



placeholder="WhatsApp conectado"



value={form.telefoneWhatsapp}



onChange={alterar}


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


Criar empresa 🚀


</button>








</div>








</div>


);



}