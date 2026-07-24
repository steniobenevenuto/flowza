import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";


interface Fluxo {

    id:number;

    pergunta:string;

    etapa:number;

    campo:string;

}



export default function Fluxos(){


    const [fluxos,setFluxos] = useState<Fluxo[]>([]);


    const [pergunta,setPergunta] = useState("");

    const [campo,setCampo] = useState("");

    const [etapa,setEtapa] = useState(1);





    useEffect(()=>{

        carregar();

    },[]);





    async function carregar(){


        try{


            const resposta = 
            await api.get("/fluxo");


            setFluxos(
                resposta.data
            );


        }catch(erro){

            console.log(erro);

        }


    }







    async function criar(){


        try{


            await api.post("/fluxo",{

                pergunta,

                campo,

                etapa

            });



            setPergunta("");

            setCampo("");

            setEtapa(etapa + 1);



            carregar();



        }catch(erro){

            console.log(erro);

        }


    }







    async function excluir(id:number){


        await api.delete(`/fluxo/${id}`);


        carregar();


    }








return(


<Layout>


<div>


<div className="
mb-8
">


<h1 className="
text-4xl
font-bold
text-white
">


Fluxos


</h1>


<p className="
text-zinc-400
mt-2
">


Crie automações inteligentes para seus atendimentos.


</p>


</div>







{/* CRIAR FLUXO */}



<div className="
bg-zinc-800
border
border-zinc-700
rounded-2xl
p-6
mb-8
shadow-xl
">


<h2 className="
text-xl
font-bold
text-white
mb-5
">


➕ Nova etapa


</h2>





<input

className="
w-full
mb-3
bg-zinc-900
border
border-zinc-700
rounded-xl
px-4
py-3
text-white
outline-none
focus:border-blue-500
"


placeholder="Digite a pergunta"


value={pergunta}


onChange={(e)=>
setPergunta(e.target.value)
}


/>






<input

className="
w-full
mb-3
bg-zinc-900
border
border-zinc-700
rounded-xl
px-4
py-3
text-white
outline-none
focus:border-blue-500
"


placeholder="Campo salvo (ex: nome, cidade)"


value={campo}


onChange={(e)=>
setCampo(e.target.value)
}


/>






<input

type="number"

className="
w-full
mb-4
bg-zinc-900
border
border-zinc-700
rounded-xl
px-4
py-3
text-white
outline-none
"


value={etapa}


onChange={(e)=>
setEtapa(Number(e.target.value))
}


/>







<button

onClick={criar}

className="
bg-blue-600
hover:bg-blue-700
text-white
px-6
py-3
rounded-xl
transition
font-semibold
"


>


Salvar etapa


</button>




</div>









{/* FLUXO VISUAL */}



<div className="
space-y-5
">


{

fluxos.length===0 ?


(

<div className="
bg-zinc-800
border
border-zinc-700
rounded-xl
p-8
text-center
text-zinc-400
">

Nenhuma etapa criada ainda.


</div>


)


:


(


fluxos.map((item,index)=>(


<div key={item.id}>


<div className="
bg-zinc-800
border
border-zinc-700
rounded-2xl
p-6
shadow-lg
hover:border-blue-500
transition
">


<div className="
flex
justify-between
items-start
">


<div>


<div className="
flex
items-center
gap-3
mb-3
">


<span className="
bg-blue-600
text-white
w-10
h-10
rounded-full
flex
items-center
justify-center
font-bold
">


{item.etapa}


</span>



<h2 className="
text-white
font-bold
text-lg
">


Etapa {item.etapa}


</h2>


</div>






<p className="
text-zinc-300
mb-3
">


💬 {item.pergunta}


</p>




<span className="
bg-blue-600/20
border
border-blue-500/30
text-blue-400
px-3
py-1
rounded-full
text-sm
">


Salvar: {item.campo}


</span>



</div>







<button

onClick={()=>
excluir(item.id)
}

className="
bg-red-500/10
text-red-400
px-4
py-2
rounded-lg
hover:bg-red-500/20
transition
"


>


Excluir


</button>





</div>


</div>





{

index !== fluxos.length-1 &&

<div className="
text-center
text-blue-500
text-2xl
py-2
">


↓

</div>


}




</div>


))


)


}



</div>







</div>



</Layout>


);


}