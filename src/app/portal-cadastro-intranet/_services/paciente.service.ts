import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Paciente } from '../_models/paciente';

@Injectable()
export class PacienteService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/api/paciente');
    }

    getById(codigo: number) {
        return this.http.get('/api/paciente/');
    }

    create(paciente: Paciente) {
        return this.http.post('/api/paciente', paciente);
    }

    update(paciente: Paciente) {
        return this.http.put('/api/paciente/' + paciente.codigo, paciente);
    }

    delete(id: number) {
        return this.http.delete('/api/paciente/' + id);
    }
}
