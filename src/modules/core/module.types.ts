export interface ModuloAtendimento {

  executar(
    empresa:any,
    lead:any,
    mensagem:string
  ):Promise<string | null>;

}