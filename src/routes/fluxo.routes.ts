import { Router } from "express";


import {

    listarFluxo,
    criarFluxo,
    excluirFluxo

} from "../controllers/fluxo.controller";


import {

    authMiddleware

} from "../middlewares/auth.middleware";



const router = Router();



router.use(

    authMiddleware

);



router.get(

    "/",

    listarFluxo

);



router.post(

    "/",

    criarFluxo

);



router.delete(

    "/:id",

    excluirFluxo

);



export default router;