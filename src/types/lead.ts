export interface Lead {
  nome?: string;
  telefone: string;
  ultimaMensagem: string;
  interesse?: string;
  etapa?: number;
  data: Date;
}