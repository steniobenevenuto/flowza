import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../services/api";

export default function IA() {

    const [carregando, setCarregando] = useState(true);
    const [permitido, setPermitido] = useState(false);

    useEffect(() => {

        carregarPlano();

    }, []);

    async function carregarPlano() {

        try {

            const resposta = await api.get("/pagamento/meu-plano");

            const plano = resposta.data.plano?.toUpperCase();

            if (plano === "PRO" || plano === "ENTERPRISE") {

                setPermitido(true);

            }

        } catch (error) {

            console.log(error);

        }

        setCarregando(false);

    }

    if (carregando) {

        return (
            <div className="p-10 text-white">
                Carregando...
            </div>
        );

    }

    if (!permitido) {

        return <Navigate to="/plano" replace />;

    }

    return (

        <div className="p-10 text-white">

            <h1 className="text-4xl font-bold mb-4">
                🧠 Inteligência Artificial
            </h1>

            <p className="text-zinc-400">
                Bem-vindo ao módulo de IA da Flowza.
            </p>

        </div>

    );

}