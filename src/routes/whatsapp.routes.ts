import { Router } from "express";

import {
    getWhatsAppStatus,
    getWhatsAppClient
} from "../services/whatsapp.service";


const router = Router();



router.get(
"/status",
(req,res)=>{


    const client =
    getWhatsAppClient();



    res.json({

        status:getWhatsAppStatus(),

        conectado:
        client.info
        ? true
        : false,


        numero:
        client.info
        ? client.info.wid.user
        : null


    });


});



export default router;