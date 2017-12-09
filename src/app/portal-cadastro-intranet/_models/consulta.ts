export interface Consulta {
    idConsulta: number;
    idAgenda: number;
    pacientecod: number;
    idTipoConsulta: number;
    idQualificacao?: number;
    idMedico: number;
    horarioInicAtendimento?: Date;
    horarioFinalAtendimento?: Date;
    situacao: string;
    horarioInicEspera?: Date;
    horarioFinalEspera?: Date;
  }
