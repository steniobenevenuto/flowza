import { criarUsuario } from "./services/auth.service";


async function iniciar(){


  const usuario = await criarUsuario(

    "Administrador",

    "admin@teste.com",

    "123456",

    1

  );


  console.log(
    "Usuário criado:",
    usuario
  );


  process.exit();

}



iniciar();