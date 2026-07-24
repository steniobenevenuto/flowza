import { Router } from "express";

import {
    planos
} from "../controllers/plano.controller";


const router = Router();



router.get(

    "/",

    planos

);



export default router;