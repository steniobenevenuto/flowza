import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


export default function ConfiguracaoInicial(){

    const navigate = useNavigate();


    const [form,setForm] = useState({

        mensagemInicial:"",
        horarioFuncionamento:"",
        endereco:"",
        instagram:"",
        site:"",
        promptIA:""

    });



    function alterar(e:any){

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }





    async function finalizar(){


        try{


            const empresaId = localStorage.getItem(
                "empresaId"
            );



            await api.put(

                `/empresa/${empresaId}/configuracao`,

                form

            );



            alert(
                "Configuração finalizada 🚀"
            );



            navigate("/dashboard");



        }catch(error:any){


            console.log(
                error.response?.data
            );


            alert(
                "Erro ao salvar configuração"
            );


        }


    }





    return(


        <div className="min-h-screen bg-gray-100 flex items-center justify-center">


            <div className="bg-white rounded-xl shadow-xl p-8 w-[500px]">


                <h1 className="text-3xl font-bold mb-3">

                    ⚙️ Configurar atendimento

                </h1>


                <p className="text-gray-500 mb-6">

                    Configure como seu atendimento automático vai funcionar.

                </p>





                <input

                className="w-full border p-3 rounded-lg mb-3"

                name="mensagemInicial"

                placeholder="Mensagem inicial do bot"

                value={form.mensagemInicial}

                onChange={alterar}

                />





                <input

                className="w-full border p-3 rounded-lg mb-3"

                name="horarioFuncionamento"

                placeholder="Horário de atendimento"

                value={form.horarioFuncionamento}

                onChange={alterar}

                />





                <input

                className="w-full border p-3 rounded-lg mb-3"

                name="endereco"

                placeholder="Endereço"

                value={form.endereco}

                onChange={alterar}

                />





                <input

                className="w-full border p-3 rounded-lg mb-3"

                name="instagram"

                placeholder="Instagram"

                value={form.instagram}

                onChange={alterar}

                />





                <input

                className="w-full border p-3 rounded-lg mb-3"

                name="site"

                placeholder="Site"

                value={form.site}

                onChange={alterar}

                />





                <textarea

                className="w-full border p-3 rounded-lg mb-5"

                name="promptIA"

                placeholder="Explique como a IA deve atender seus clientes"

                rows={4}

                value={form.promptIA}

                onChange={alterar}

                />





                <button

                onClick={finalizar}

                className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl font-bold"

                >

                    Finalizar configuração 🚀

                </button>



            </div>


        </div>


    );


}