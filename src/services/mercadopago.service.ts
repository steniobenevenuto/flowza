import { MercadoPagoConfig, Preference } from "mercadopago";


const client = new MercadoPagoConfig({

    accessToken:
    process.env.MERCADO_PAGO_ACCESS_TOKEN!

});





export async function criarCheckout(

    plano:string,

    valor:number,

    empresaId:number

){


    const preference = new Preference(client);



    const resposta = await preference.create({

        body:{


            items:[

                {

                    id:plano,

                    title:
                    `Flowza Plano ${plano}`,

                    quantity:1,

                    unit_price:valor

                }

            ],



            back_urls:{


                success:
                "http://localhost:5173/plano/sucesso",


                failure:
                "http://localhost:5173/plano",


                pending:
                "http://localhost:5173/plano"

            },



            notification_url:

            "https://SEU_DOMINIO.com/pagamento/webhook",



            external_reference:

            empresaId.toString()


        }

    });


    return resposta;

}