import { Server } from "socket.io";


let io: Server | null = null;



export function iniciarSocket(
    server: Server
){

    io = server;

}




export function emitirParaEmpresa(
    empresaId:number,
    evento:string,
    dados:any
){

    if(!io){

        console.log(
            "Socket ainda não iniciado"
        );

        return;

    }



    console.log(
        "Emitindo socket:",
        evento,
        dados
    );



    io
    .to(
        `empresa_${empresaId}`
    )
    .emit(

        evento,

        dados

    );

}