export interface Paciente {
    codigo: string;
    nome: string;
    sobreNome: string;
    nascimento: Date;
    cns?: string;
    cpf?: string;
}
