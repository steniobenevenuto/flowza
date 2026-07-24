import { buscarImoveisPorCidade, buscarImoveisPorBairro } from "./imovel.service";


export async function procurarImoveis(
  mensagem:string,
  empresaId:number
){


  const texto = mensagem.toLowerCase();



  // procura cidade

  const cidades = [
    "fortaleza",
    "eusebio",
    "eusébio",
    "caucaia",
    "itaitinga",
    "maracanau",
    "maracanaú"
  ];



  for(const cidade of cidades){


    if(texto.includes(cidade)){


      const imoveis =
        await buscarImoveisPorCidade(
          cidade,
          empresaId
        );


      if(imoveis.length){

        return montarResposta(
          imoveis
        );

      }


    }

  }





  // procura bairro

  const bairros = [
    "messejana",
    "jereissati",
    "pajuçara",
    "centro",
    "eusébio"
  ];



  for(const bairro of bairros){


    if(texto.includes(bairro)){


      const imoveis =
        await buscarImoveisPorBairro(
          bairro,
          empresaId
        );


      if(imoveis.length){

        return montarResposta(
          imoveis
        );

      }


    }

  }




  return null;

}





function montarResposta(imoveis:any[]){


let resposta = 
"Encontrei essas opções para você 🏠😊\n\n";



imoveis.forEach((imovel,index)=>{


resposta +=
`
${index+1} - ${imovel.titulo}

📍 ${imovel.cidade} - ${imovel.bairro}

💰 R$ ${imovel.preco}

🛏 ${imovel.quartos} quartos

🚗 ${imovel.vagas} vagas

${imovel.descricao}

------------------

`;

});


return resposta;


}