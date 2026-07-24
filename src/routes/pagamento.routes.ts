import { Router } from "express";

import {

    checkout,

    aprovarPagamento,

    meuPlano

} from "../controllers/pagamento.controller";


import {

    authMiddleware

} from "../middlewares/auth.middleware";



const router = Router();



router.use(

    authMiddleware

);





router.post(

    "/checkout",

    checkout

);





router.post(

    "/aprovar/:id",

    aprovarPagamento

);





router.get(

    "/meu-plano",

    meuPlano

);





export default router;