export interface Paciente {
    pessoa: {
        nome: string;
        apelido: string;
        nomeMae: string;
        nomePai: string;
        dataNascimento: Date;
    };
    nacionalidade: {
        name: string;
        id: 1
    };
    naturalidade: {
        municipioNascimento: string;
        paisNascimento: string;
        nomade: true
    };
    naturalizacao: {
        numero: string;
        portaria: string;
        pais: string;
        dataEntrada: Date;
        dataNaturalizacao: Date;
    };
    tipoSanguineo: {
        name: string;
        id: 1
    };
    cor: {
        name: string;
        id: 1
    };
    sexo: {
        name: string;
        id: 1
    };
    endereco: {
        cepResidencia: string;
        numeroResidencia: 0
    };
    etiniaIndigena: {
        chaveNaturalEtnia: string;
        etnia: string
    };
    obito: {
        medico: string;
        horario: Date;
        descricao: string;
    };
    meta: {
        chaveNaturalCadSus: string;
    };
    id: 0;
}
