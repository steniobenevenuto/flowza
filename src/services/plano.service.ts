export function listarPlanos(){

    return [

        {

            id:"starter",

            nome:"Starter",

            preco:39,


            limites:{

                whatsapp:1,

                usuarios:1,

                leads:300,

                ia:false

            },


            descricao:[

                "1 WhatsApp conectado",

                "CRM de leads",

                "Até 300 leads/mês",

                "Fluxos simples",

                "Histórico de conversas",

                "1 usuário"

            ]

        },




        {

            id:"pro",

            nome:"Pro",

            preco:79,


            limites:{

                whatsapp:3,

                usuarios:3,

                leads:5000,

                ia:true

            },


            descricao:[

                "Tudo do Starter",

                "IA de atendimento",

                "Base de conhecimento",

                "Fluxos avançados",

                "Campos personalizados",

                "Relatórios",

                "Até 3 usuários"

            ]

        },





        {

            id:"business",

            nome:"Business",

            preco:149,


            limites:{

                whatsapp:5,

                usuarios:-1,

                leads:20000,

                ia:true

            },


            descricao:[

                "Tudo do Pro",

                "Até 5 WhatsApps",

                "Usuários ilimitados",

                "Personalização da marca",

                "Suporte prioritário",

                "Integrações futuras"

            ]

        }


    ];

}





export function buscarPlano(id:string){


    const planos = listarPlanos();


    return planos.find(

        plano => plano.id === id

    );


}