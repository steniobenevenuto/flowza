import {Router} from "express";


import {

listaConversas,

conversa

} from "../controllers/conversa.controller";


import {

authMiddleware

} from "../middlewares/auth.middleware";



const router = Router();



router.use(
authMiddleware
);




router.get(

"/",

listaConversas

);





router.get(

"/:leadId",

conversa

);





export default router;