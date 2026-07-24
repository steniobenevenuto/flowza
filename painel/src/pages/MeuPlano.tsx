import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

interface MeuPlano {
    nome: string;
    plano: string;
    trial: boolean;
    ativo: boolean;
}

export default function MeuPlano() {

    const [dados, setDados] = useState<MeuPlano | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        carregar();
    }, []);

    async function carregar() {

        try {

            const resposta = await api.get("/pagamento/meu-plano");

            setDados(resposta.data);

        } catch (erro) {

            console.log(erro);

        }

    }

    if (!dados) {

        return (
            <Layout>
                <div className="text-white text-xl">
                    Carregando...
                </div>
            </Layout>
        );

    }

    return (

        <Layout>

            <div className="max-w-3xl">

                <h1 className="text-4xl font-bold text-white mb-8">
                    📦 Meu Plano
                </h1>

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

                    <div className="mb-6">

                        <p className="text-zinc-400">
                            Empresa
                        </p>

                        <h2 className="text-2xl text-white font-bold">
                            {dados.nome}
                        </h2>

                    </div>

                    <div className="grid md:grid-cols-3 gap-6">

                        <div className="bg-zinc-800 rounded-xl p-5">

                            <p className="text-zinc-400 mb-2">

                                Plano

                            </p>

                            <h3 className="text-3xl font-bold text-blue-400">

                                {dados.plano}

                            </h3>

                        </div>

                        <div className="bg-zinc-800 rounded-xl p-5">

                            <p className="text-zinc-400 mb-2">

                                Status

                            </p>

                            <h3 className="text-2xl">

                                {dados.ativo ? "✅ Ativo" : "❌ Inativo"}

                            </h3>

                        </div>

                        <div className="bg-zinc-800 rounded-xl p-5">

                            <p className="text-zinc-400 mb-2">

                                Trial

                            </p>

                            <h3 className="text-2xl">

                                {dados.trial ? "🎁 Sim" : "🚀 Finalizado"}

                            </h3>

                        </div>

                    </div>

                    <button

                        onClick={() => navigate("/planos")}

                        className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 font-bold transition"

                    >

                        Alterar Plano

                    </button>

                </div>

            </div>

        </Layout>

    );

}