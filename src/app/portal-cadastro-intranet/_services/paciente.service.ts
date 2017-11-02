import { Injectable } from '@angular/core';
import { Paciente } from '../_models/paciente';
import { generateUUID } from '../_util/util';

@Injectable()
export class PacienteService {
    private pacientes;

    constructor() {
        this.pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
    }

    getData(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.getAll());
            }, 2000);
        });
    }

    getAll() {
        return this.pacientes;
    }

    getById(codigo) {
        return this.pacientes.find(X => X.codigo === codigo);
    }

    cadastrarPaciente(paciente): string {
        paciente.codigo = this.geradorCNSValido();
        this.pacientes.push(paciente);
        this.salvarDadosLocalStore();
        return paciente.codigo;
    }

    create(paciente) {
        paciente.codigo = this.geradorCNSValido();
        this.pacientes.push(paciente);
        this.salvarDadosLocalStore();
    }

    salvarDadosLocalStore() {
        localStorage.setItem('pacientes', JSON.stringify(this.pacientes));
    }

    private geradorCNSValido() {
        let gera0 = Math.floor((Math.random() * 3) + 1);

        if (gera0 === 3) {
            gera0 = Math.floor((Math.random() * 3) + 7);
        }

        const gera1 = Math.floor((Math.random() * 99999) + 1);
        const gera2 = Math.floor((Math.random() * 99999) + 1);

        let cns = gera0 + ('0' + gera1).slice(-5) + ('0' + gera2).slice(-5);
        let soma = (((Number(cns.substring(0, 1))) * 15) +
            ((Number(cns.substring(1, 2))) * 14) +
            ((Number(cns.substring(2, 3))) * 13) +
            ((Number(cns.substring(3, 4))) * 12) +
            ((Number(cns.substring(4, 5))) * 11) +
            ((Number(cns.substring(5, 6))) * 10) +
            ((Number(cns.substring(6, 7))) * 9) +
            ((Number(cns.substring(7, 8))) * 8) +
            ((Number(cns.substring(8, 9))) * 7) +
            ((Number(cns.substring(9, 10))) * 6) +
            ((Number(cns.substring(10, 11))) * 5));

        let resto = soma % 11;
        let dv = 11 - resto;

        dv = (dv === 11) ? 0 : dv;

        if (dv === 10) {
            soma = (((Number(cns.substring(0, 1))) * 15) +
                ((Number(cns.substring(1, 2))) * 14) +
                ((Number(cns.substring(2, 3))) * 13) +
                ((Number(cns.substring(3, 4))) * 12) +
                ((Number(cns.substring(4, 5))) * 11) +
                ((Number(cns.substring(5, 6))) * 10) +
                ((Number(cns.substring(6, 7))) * 9) +
                ((Number(cns.substring(7, 8))) * 8) +
                ((Number(cns.substring(8, 9))) * 7) +
                ((Number(cns.substring(9, 10))) * 6) +
                ((Number(cns.substring(10, 11))) * 5) + 2);

            resto = soma % 11;
            dv = 11 - resto;
            cns += '001' + String(dv);
        } else {
            cns += '000' + String(dv);
        }
        return cns;
    }

    // getById(codigo: number) {
    //     return this.http.get('/api/paciente/');
    // }

    // create(paciente: Paciente) {
    //     return this.http.post('/api/paciente', paciente);
    // }

    // update(paciente: Paciente) {
    //     return this.http.put('/api/paciente/' + paciente.codigo, paciente);
    // }

    // delete(id: number) {
    //     return this.http.delete('/api/paciente/' + id);
    // }
}
