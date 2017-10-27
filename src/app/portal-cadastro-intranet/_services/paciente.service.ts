import { Injectable } from '@angular/core';
import { Paciente } from '../_models/paciente';

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

    create(paciente) {
        const pacientes: any[] = JSON.parse(localStorage.getItem('pacientes') || '[]');
        paciente.codigo = this.generateUUID();
        pacientes.push(paciente);
        localStorage.setItem('pacientes', JSON.stringify(pacientes));
    }

    private generateUUID() {
        let d = new Date().getTime();
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          const r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
      };

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
