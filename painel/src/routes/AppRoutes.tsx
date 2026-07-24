import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Empresas from "../pages/Empresas";
import ConfigurarEmpresa from "../pages/ConfigurarEmpresa";

import Dashboard from "../pages/Dashboard";
import Leads from "../pages/Leads";
import Conversa from "../pages/Conversa";
import Conversas from "../pages/Conversas";
import Configuracoes from "../pages/Configuracoes";
import Fluxos from "../pages/Fluxos";
import Planos from "../pages/Planos";
import IA from "../pages/IA";

export default function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/cadastro"
                    element={<Cadastro />}
                />

                <Route
                    path="/criar-empresa"
                    element={<Empresas />}
                />

                <Route
                    path="/configurar-empresa"
                    element={<ConfigurarEmpresa />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/leads"
                    element={<Leads />}
                />

                <Route
                    path="/conversas"
                    element={<Conversas />}
                />

                <Route
                    path="/conversas/:leadId"
                    element={<Conversa />}
                />

                <Route
                    path="/fluxos"
                    element={<Fluxos />}
                />

                <Route
                    path="/configuracoes"
                    element={<Configuracoes />}
                />

                <Route
                    path="/ia"
                    element={<IA />}
                />

                <Route
                    path="/plano"
                    element={<Planos />}
                />

            </Routes>

        </BrowserRouter>

    );

}