import { Historico } from './historico';

export interface Prontuario {
    idProntuario: number;
    pacientecod: number;
    antecedentes: string;
    historico: Historico[];
}
