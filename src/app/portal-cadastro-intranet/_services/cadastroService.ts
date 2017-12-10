import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class CadastroService {
    emitirDiaSelecionado = new EventEmitter<Date>();

    diaSelecionado(dia: Date) {
        this.emitirDiaSelecionado.emit(dia);
    }
}
