export interface Paciente {
    codigo: string;
    nome: string;
    apelido: string;
    nascimento: Date;
    sexo?: string;
    cns?: string;
    cpf?: string;
}
