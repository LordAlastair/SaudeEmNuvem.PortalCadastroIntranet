import { Injectable } from '@angular/core';
import { Paciente } from '../_models/paciente';
import { generateUUID } from '../_util/util';

@Injectable()
export class PacienteService {
    constructor() { }

    getData(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.getAll());
            }, 2000);
        });
    }

    getAll() {
        const data = JSON.parse(localStorage.getItem('pacientes') || '[]');
        return data;
    }

    getById(codigo: number) {
        const pacientes: any[] = JSON.parse(localStorage.getItem('pacientes') || '[]');
        return pacientes.find(X => X.codigo === codigo);
    }

    cadastrarPaciente(paciente): string {
        const pacientes: any[] = JSON.parse(localStorage.getItem('pacientes') || '[]');
        paciente.codigo = generateUUID();
        pacientes.push(paciente);
        localStorage.setItem('pacientes', JSON.stringify(pacientes));
        return paciente.codigo;
    }

    create(paciente) {
        const pacientes: any[] = JSON.parse(localStorage.getItem('pacientes') || '[]');
        paciente.codigo = generateUUID();
        pacientes.push(paciente);
        localStorage.setItem('pacientes', JSON.stringify(pacientes));
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
