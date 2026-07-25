import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import socket from "../services/socket";


interface Props{
    children:ReactNode;
}


export default function Layout({children}:Props){


    const navigate = useNavigate();



    useEffect(()=>{


        const token =
        localStorage.getItem("token");


        const empresaId =
        localStorage.getItem("empresaId");



        if(token){


            socket.auth = {
                token
            };


            if(!socket.connected){

                socket.connect();

            }



            if(empresaId){


                socket.emit(
                    "entrar_empresa",
                    Number(empresaId)
                );


                console.log(
                    "Socket conectado empresa:",
                    empresaId
                );


            }


        }



        return()=>{


            socket.disconnect();


        };


    },[]);





    function sair(){


        socket.disconnect();


        localStorage.clear();


        navigate("/");


    }






    const empresa =
        localStorage.getItem("empresaNome")
        ||
        "Minha Empresa";






    const menuClass = `
    flex
    items-center
    w-full
    px-3
    py-2.5
    rounded-xl
    text-sm
    text-zinc-300
    hover:bg-zinc-800
    hover:text-white
    transition
    `;





    return(


        <div className="
        flex
        min-h-screen
        bg-zinc-900
        text-white
        ">



            <aside className="
            w-64
            bg-zinc-950
            border-r
            border-zinc-800
            flex
            flex-col
            ">



                <div className="
                p-5
                border-b
                border-zinc-800
                ">



                    <h1 className="
                    text-2xl
                    font-bold
                    tracking-tight
                    ">


                        <span className="text-blue-500">
                            F
                        </span>

                        lowza


                    </h1>




                    <p className="
                    text-xs
                    text-zinc-400
                    mt-1
                    ">

                        Automação inteligente

                    </p>





                    <div className="
                    mt-4
                    flex
                    items-center
                    gap-2
                    text-xs
                    text-blue-400
                    ">


                        <span className="
                        w-2
                        h-2
                        rounded-full
                        bg-blue-500
                        " />

                        Sistema online


                    </div>


                </div>






                <div className="p-4">



                    <div className="
                    bg-zinc-900
                    border
                    border-zinc-800
                    rounded-xl
                    p-3
                    ">


                        <p className="
                        text-xs
                        text-zinc-500
                        ">

                            Empresa

                        </p>




                        <p className="
                        text-sm
                        font-semibold
                        mt-1
                        truncate
                        ">

                            {empresa}

                        </p>


                    </div>


                </div>








                <nav className="
                flex
                flex-col
                flex-1
                px-3
                gap-1
                ">



                    <p className="
                    px-3
                    text-[11px]
                    uppercase
                    text-zinc-500
                    mb-2
                    ">

                        Principal

                    </p>





                    <Link
                    to="/dashboard"
                    className={menuClass}
                    >
                        📊 Dashboard
                    </Link>




                    <Link
                    to="/leads"
                    className={menuClass}
                    >
                        👥 Leads
                    </Link>




                    <Link
                    to="/conversas"
                    className={menuClass}
                    >
                        💬 Conversas
                    </Link>








                    <p className="
                    px-3
                    text-[11px]
                    uppercase
                    text-zinc-500
                    mt-7
                    mb-2
                    ">

                        Ferramentas

                    </p>






                    <Link
                    to="/fluxos"
                    className={menuClass}
                    >
                        🔄 Fluxos
                    </Link>





                    <Link
                    to="/ia"
                    className={menuClass}
                    >
                        🧠 IA
                    </Link>





                    <Link
                    to="/configuracoes"
                    className={menuClass}
                    >
                        ⚙️ Configurações
                    </Link>





                    <Link
                    to="/plano"
                    className={menuClass}
                    >
                        💳 Plano
                    </Link>





                </nav>








                <div className="
                p-4
                border-t
                border-zinc-800
                ">



                    <button

                    onClick={sair}

                    className="
                    w-full
                    py-2.5
                    rounded-xl
                    bg-red-500/10
                    text-red-400
                    text-sm
                    hover:bg-red-500/20
                    transition
                    "

                    >

                        🚪 Sair


                    </button>



                </div>





            </aside>









            <main className="
            flex-1
            p-8
            bg-zinc-900
            overflow-auto
            ">


                {children}


            </main>





        </div>


    );


}