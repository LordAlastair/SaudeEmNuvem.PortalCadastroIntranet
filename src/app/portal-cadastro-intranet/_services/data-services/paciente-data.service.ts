import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import { HttpWrapperService } from '../httpWrapper.service';
import { Configuration } from '../../_shared/configuration';
import { Paciente } from '../../_models/paciente';

const uuidv4 = require('uuid/v4');

@Injectable()
export class PacienteDataService {

    public actionUrl: string;

    constructor(private http: HttpWrapperService, private configuration: Configuration) {
        this.actionUrl = configuration.server + configuration.apiUrl + 'paciente/';
    }

    buscarTodos = (): Observable<Paciente[]> => {
        return this.http.get<Paciente[]>(this.actionUrl)
            .pipe(catchError(this.handleError));
    }

    buscarPorCodigo = (codigo: string): Observable<Paciente> => {
        return this.http.get<Paciente>(this.actionUrl + codigo)
            .pipe(catchError(this.handleError));
    }

    criar = (paciente: Paciente): Observable<Paciente> => {
        paciente.pacientecod = null;
        paciente.chaveNatural = uuidv4();
        paciente.cns = this.geradorCNSValido();
        this.http.post(this.actionUrl, paciente).subscribe(
            res => {
              console.log(res);
            },
            (err: HttpErrorResponse) => {
              console.log(err.error);
              console.log(err.name);
              console.log(err.message);
              console.log(err.status);
            },
          );
          return null;
        // return this.http.post<Paciente>(this.actionUrl, paciente)
        //     .pipe(catchError(this.handleError));
    }

    atualizar = (codigo: string, foodToUpdate: Paciente): Observable<Paciente> => {
        return this.http.put<Paciente>(this.actionUrl + codigo, JSON.stringify(foodToUpdate))
            .pipe(catchError(this.handleError));
    }

    // apagar = (paciente: Paciente): Observable<HttpResponse<any>> => {
    //     return this.http.delete(this.actionUrl + paciente.codigo)
    //     .pipe(catchError(this.handleError));
    // }


    private handleError(error: HttpResponse<any>) {
        return Observable.throw(error || 'Server error');
    }

    public geradorCNSValido() {
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
        const teste = dv;
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
}
