import { Router } from "express";

import {
    dashboard
} from "../controllers/dashboard.controller";

import {
    authMiddleware
} from "../middlewares/auth.middleware";



const router = Router();




// Protege todas as rotas do dashboard

router.use(
    authMiddleware
);




// Dashboard principal

router.get(
    "/",
    dashboard
);




export default router;