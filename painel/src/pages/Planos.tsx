import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import api from "../services/api";


interface Plano {

    id:string;

    nome:string;

    preco:number;

    descricao:string[];

}



export default function Planos(){


const [planos,setPlanos] = useState<Plano[]>([]);

const [carregando,setCarregando] = useState("");





useEffect(()=>{

    carregar();

},[]);





async function carregar(){


    try{


        const resposta = await api.get("/planos");


        setPlanos(

            resposta.data

        );


    }catch(error){


        console.log(error);


    }


}







async function assinar(planoId:string){


    try{


        setCarregando(planoId);



        const resposta = await api.post(

            "/pagamento/checkout",

            {

                plano: planoId

            }

        );



        console.log(

            "PAGAMENTO CRIADO:",

            resposta.data

        );



        alert(

            "Checkout criado com sucesso 🚀"

        );



    }catch(error:any){


        console.log(

            error.response?.data || error

        );



        alert(

            "Erro ao iniciar pagamento"

        );



    }finally{


        setCarregando("");

    }



}







return(


<Layout>


<div className="max-w-6xl">



<h1 className="text-4xl font-bold text-white">

🚀 Planos Flowza

</h1>




<p className="text-zinc-400 mt-2 mb-10">

Escolha o plano ideal para sua empresa crescer.

</p>






<div className="grid md:grid-cols-3 gap-6">





{

planos.map((plano)=>(



<div


key={plano.id}


className={`

rounded-2xl

p-8

border

transition

hover:scale-105

duration-300



${

plano.id === "pro"

?

"bg-blue-600 border-blue-400 shadow-xl"

:

"bg-zinc-900 border-zinc-800"

}

`}



>




{

plano.id === "pro" && (


<div className="mb-4 inline-block bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-bold">

⭐ Mais escolhido

</div>


)

}







<h2 className="text-2xl font-bold text-white mb-4">

{plano.nome}

</h2>








<div className="text-4xl font-bold text-white mb-6">


R$ {plano.preco}


<span className="text-base font-normal opacity-70">

/mês

</span>


</div>









<ul className="space-y-3 mb-8 text-white">


{


plano.descricao.map((item,index)=>(


<li

key={index}

className="flex gap-2"

>


<span>

✓

</span>


{item}


</li>


))


}



</ul>









<button


onClick={()=>assinar(plano.id)}


disabled={carregando === plano.id}


className={`

w-full

py-3

rounded-xl

font-bold



${

plano.id === "pro"

?

"bg-white text-blue-600"

:

"bg-blue-600 text-white"

}

`}


>



{

carregando === plano.id

?

"Gerando..."

:

"Assinar plano"

}



</button>







</div>



))


}




</div>





</div>



</Layout>



);



}