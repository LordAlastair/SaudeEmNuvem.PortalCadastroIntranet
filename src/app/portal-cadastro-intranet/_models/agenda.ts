import { Consulta } from './consulta';

export interface Agenda {
  idAgenda: number;
  idMedico: number;
  idConsulta: number;
  situacao: string;
  horario: Date;
  consulta: Consulta;
}
