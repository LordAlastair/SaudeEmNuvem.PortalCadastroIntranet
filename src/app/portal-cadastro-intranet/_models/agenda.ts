import { Consulta } from './consulta';

export interface Agenda {
  idAgenda: number;
  idConsulta: number;
  situacao: string;
  horario: Date;
  consulta: Consulta;
}
