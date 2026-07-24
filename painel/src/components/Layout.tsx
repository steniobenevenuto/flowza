import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";


interface Props{
    children:ReactNode;
}


export default function Layout({children}:Props){


    const navigate = useNavigate();



    function sair(){

        localStorage.clear();

        navigate("/");

    }



    const empresa =
        localStorage.getItem("empresaNome")
        ||
        "Minha Empresa";



    return(


        <div className="
        flex
        min-h-screen
        bg-zinc-900
        text-white
        ">


            {/* SIDEBAR */}


            <aside className="
            w-60
            bg-zinc-950
            border-r
            border-zinc-800
            flex
            flex-col
            ">




                {/* LOGO */}


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
                        ">


                        </span>


                        Sistema online


                    </div>


                </div>








                {/* EMPRESA */}


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









                {/* MENU */}



                <nav className="
                flex-1
                px-3
                space-y-1
                ">



                    <p className="
                    px-3
                    text-[11px]
                    uppercase
                    text-zinc-500
                    mb-3
                    ">

                        Principal

                    </p>





                    <Link
                    to="/dashboard"
                    className="
                    flex
                    gap-3
                    items-center
                    px-3
                    py-2.5
                    rounded-xl
                    text-sm
                    text-zinc-300
                    hover:bg-blue-600
                    hover:text-white
                    transition
                    "
                    >

                        📊 Dashboard

                    </Link>






                    <Link
                    to="/leads"
                    className="
                    flex
                    gap-3
                    items-center
                    px-3
                    py-2.5
                    rounded-xl
                    text-sm
                    text-zinc-300
                    hover:bg-blue-600
                    hover:text-white
                    transition
                    "
                    >

                        👥 Leads

                    </Link>







                    <Link
                    to="/conversas"
                    className="
                    flex
                    gap-3
                    items-center
                    px-3
                    py-2.5
                    rounded-xl
                    text-sm
                    text-zinc-300
                    hover:bg-blue-600
                    hover:text-white
                    transition
                    "
                    >

                        💬 Conversas

                    </Link>







                    <p className="
                    px-3
                    text-[11px]
                    uppercase
                    text-zinc-500
                    mt-7
                    mb-3
                    ">

                        Ferramentas

                    </p>







                    <Link
                    to="/fluxos"
                    className="
                    flex
                    gap-3
                    items-center
                    px-3
                    py-2.5
                    rounded-xl
                    text-sm
                    text-zinc-300
                    hover:bg-blue-600
                    hover:text-white
                    transition
                    "
                    >

                        🔄 Fluxos

                    </Link>



                    <Link
                    to="/ia"
                    className="
                    flex
                    gap-3
                    items-center
                    px-3
                    py-2.5
                    rounded-xl
                    text-sm
                    text-zinc-300
                    hover:bg-blue-600
                    hover:text-white
                    transition
                    "
                    >

                        🧠 IA

                    </Link>








                    <Link
                    to="/configuracoes"
                    className="
                    flex
                    gap-3
                    items-center
                    px-3
                    py-2.5
                    rounded-xl
                    text-sm
                    text-zinc-300
                    hover:bg-blue-600
                    hover:text-white
                    transition
                    "
                    >

                        ⚙️ Configurações

                    </Link>







                    <Link
                    to="/plano"
                    className="
                    flex
                    gap-3
                    items-center
                    px-3
                    py-2.5
                    rounded-xl
                    text-sm
                    text-zinc-300
                    hover:bg-blue-600
                    hover:text-white
                    transition
                    "
                    >

                        💳 Plano

                    </Link>



                </nav>










                {/* SAIR */}


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









            {/* CONTEÚDO */}



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