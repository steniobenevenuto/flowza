import { Router } from "express";


import {

    cadastrarEmpresa,

    empresas,

    atualizarEmpresaController

} from "../controllers/empresa.controller";



import {

    authMiddleware

} from "../middlewares/auth.middleware";



const router = Router();



// tudo empresa precisa estar logado

router.use(authMiddleware);





router.post(

"/",

cadastrarEmpresa

);





router.get(

"/",

empresas

);





router.put(

"/:id",

atualizarEmpresaController

);



export default router;