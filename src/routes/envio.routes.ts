import { Router } from "express";

import {
    enviar
} from "../controllers/envio.controller";

import {
    authMiddleware
} from "../middlewares/auth.middleware";


const router = Router();



router.use(
    authMiddleware
);



router.post(
    "/:leadId",
    enviar
);



export default router;