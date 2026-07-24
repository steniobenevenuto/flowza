import { Router } from "express";

import {
    listar
} from "../controllers/lead.controller";

import {
    authMiddleware
} from "../middlewares/auth.middleware";


const router = Router();


router.use(
    authMiddleware
);


router.get(
    "/",
    listar
);


export default router;