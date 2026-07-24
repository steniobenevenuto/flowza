import {Router} from "express";

import {
minhaAssinatura
} from "../controllers/assinatura.controller";


import {
authMiddleware
} from "../middlewares/auth.middleware";



const router = Router();



router.use(
authMiddleware
);



router.get(
"/",
minhaAssinatura
);



export default router;