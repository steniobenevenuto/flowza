import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


export default function Login(){


const [email,setEmail] = useState("");

const [senha,setSenha] = useState("");

const [trialExpirado,setTrialExpirado] = useState(false);


const navigate = useNavigate();






async function entrar(){


try{


const resposta = await api.post(

"/auth/login",

{

email,

senha

}

);





console.log(
"RESPOSTA LOGIN:",
resposta.data
);







localStorage.setItem(
"email",
email
);



localStorage.setItem(
"senha",
senha
);







localStorage.setItem(

"token",

resposta.data.token

);







if(resposta.data.precisaCriarEmpresa){



localStorage.setItem(

"usuarioNome",

resposta.data.usuario.nome

);



navigate("/criar-empresa");


return;


}









if(resposta.data.empresa){



localStorage.setItem(

"empresaId",

String(
resposta.data.empresa.id
)

);




localStorage.setItem(

"empresaNome",

resposta.data.empresa.nome

);


}








localStorage.setItem(

"usuarioNome",

resposta.data.usuario.nome

);







console.log(

"EMPRESA ID:",

localStorage.getItem("empresaId")

);








navigate("/dashboard");






}catch(error:any){



console.log(
"ERRO LOGIN:",
error
);





if(error.response?.status === 403){



setTrialExpirado(true);



return;


}






alert(

error.response?.data?.erro ||

"Email ou senha inválidos"

);




}



}









if(trialExpirado){



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
shadow-xl
w-[500px]
p-10
text-center
">


<div className="text-6xl mb-5">

🚀

</div>




<h1 className="
text-3xl
font-bold
text-white
mb-3
">

Seu teste gratuito terminou

</h1>





<p className="
text-zinc-400
mb-8
">

Para continuar usando a Flowza,
escolha um plano.

</p>






<button

onClick={()=>navigate("/plano")}

className="
w-full
bg-blue-600
hover:bg-blue-700
text-white
p-4
rounded-xl
font-semibold
transition
"

>

Escolher plano

</button>



</div>


</div>


);



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
w-[420px]
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








<input

className="
w-full
bg-zinc-900
border
border-zinc-700
rounded-xl
px-4
py-3
mb-4
text-white
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
rounded-xl
px-4
py-3
mb-6
text-white
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









<button

onClick={entrar}

className="
w-full
bg-blue-600
hover:bg-blue-700
text-white
p-3
rounded-xl
font-semibold
transition
"

>

Entrar

</button>










<div className="
mt-6
text-center
">






<p className="
text-zinc-400
">

Ainda não possui uma conta?

</p>






<button

onClick={()=>navigate("/cadastro")}

className="
mt-3
text-blue-400
hover:text-blue-300
font-semibold
"

>

Criar minha conta gratuitamente

</button>





</div>





</div>






</div>


);



}