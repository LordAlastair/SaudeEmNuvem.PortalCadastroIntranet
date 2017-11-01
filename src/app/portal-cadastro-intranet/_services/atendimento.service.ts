import { Injectable } from '@angular/core';
import { Atendimento } from '../_models/atendimento';
import { generateUUID } from '../_util/util';

@Injectable()
export class AtendimentoService {
    gerarProtocoloPacienteRealizarCadastro(codigoPaciente) {
        const atendimento: Atendimento = {
            'codigo': generateUUID(),
            'tipo': 'Cadastro de Paciente',
            'data': new Date(),
            'atendente': 'Atendente de teste',
            'paciente': codigoPaciente,
        };
        const atendimentos: any[] = JSON.parse(localStorage.getItem('atendimentos') || '[]');
        atendimentos.push(atendimento);
        localStorage.setItem('atendimentos', JSON.stringify(atendimentos));
        return atendimento;
    }

    // apenas para propositos de teste...
    listarTodosProtocolos() {
        const data = JSON.parse(localStorage.getItem('atendimentos') || '[]');
        return data;
    }

    buscarPorProtocolo(codigo) {
        const data = JSON.parse(localStorage.getItem('atendimentos') || '[]');
        const pacientes: any[] = JSON.parse(localStorage.getItem('pacientes') || '[]');
        return data.find(x => x.codigo === codigo);
    }
}
