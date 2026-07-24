import { Router } from "express";

import {

    configuracao,

    salvarConfiguracao

} from "../controllers/configuracao.controller";

import {

    authMiddleware

} from "../middlewares/auth.middleware";

const router = Router();

router.use(

    authMiddleware

);

router.get(

    "/",

    configuracao

);

router.put(

    "/",

    salvarConfiguracao

);

export default router;