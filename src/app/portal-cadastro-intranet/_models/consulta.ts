export interface Consulta {
  horarioMarcado: Date;
  inicioAtendimento: Date;
  fimAtendimento: Date;
  tipoConsulta: string;
  origem: string;
  destino: string;
  idtStatus: string;
  paciente: {
    nome: string;
    dataNascimento: Date;
    chaveNaturalCadSus: string;
    chaveNaturalCadApi: string;
    id: 0;
  };
  qualificacao: {
    descricao: string;
    motivoServico: string;
    notaServico: 10;
    notaMedico: 10;
    situacao: string;
    dataQualificacao: Date;
  };
  medico: {
    nome: string;
    dataNascimento: Date;
    chaveNaturalCadSus: string;
    chaveNaturalCadApi: string;
    id: 1;
  };
  id: 11;
}
