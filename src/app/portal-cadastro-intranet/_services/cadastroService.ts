import { EventEmitter, Injectable } from '@angular/core';
import { Paciente } from '../_models/paciente';
import { Agenda } from '../_models/agenda';
import { Medico } from '../_models/medico';

@Injectable()
export class CadastroService {
    emitirDiaSelecionado = new EventEmitter<Date>();
    emitirHorarioSelecionado = new EventEmitter<Agenda>();
    emitirPacienteSelecionado = new EventEmitter<Paciente>();

    diaSelecionado(dia: Date) {
        console.log('você selecionou um dia da agenda');
        this.emitirDiaSelecionado.emit(dia);
    }

    horarioSelecionado(agenda: Agenda) {
        console.log('você selecionou um horario medico livre');
        this.emitirHorarioSelecionado.emit(agenda);
    }

    pacienteSelecionado(paciente: Paciente) {
        console.log('você selecionou um paciente para marcar consulta');
        this.emitirPacienteSelecionado.emit(paciente);
    }
}
