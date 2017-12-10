import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import { HttpWrapperService } from '../httpWrapper.service';
import { Configuration } from '../../_shared/configuration';
import { Paciente } from '../../_models/paciente';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators';
import { ToasterService, Toast } from 'angular2-toaster';
const uuidv4 = require('uuid/v4');

@Injectable()
export class PacienteDataService {

  public actionUrl: string;

  constructor(private http: HttpWrapperService, private configuration: Configuration, private toasterService: ToasterService) {
    this.actionUrl = configuration.server + configuration.apiUrl + 'paciente/';
  }

  buscarTodos(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.actionUrl)
      .pipe(catchError(this.handleError<Paciente[]>('buscarTodos')));
  }

  buscarPorCodigo(codigo: number): Observable<Paciente> {
    return this.http.get<Paciente>(this.actionUrl + codigo)
      .pipe(catchError(this.handleError<Paciente>('buscarPorCodigo')));
  }

  criar(paciente: Paciente): Observable<Paciente> {
    paciente.chaveNatural = uuidv4();
    paciente.cns = this.geradorCNSValido();

    return this.http.post<Paciente>(this.actionUrl, paciente).pipe(
      tap((data: Paciente) => this.log('Solicitação de cadastro iniciada')),
      catchError(this.handleError<Paciente>('criar')),
    );
  }

  atualizar = (codigo: string, paciente: Paciente): Observable<Paciente> => {
    return this.http.put<Paciente>(this.actionUrl + codigo, JSON.stringify(paciente))
      .pipe(catchError(this.handleError<Paciente>('atualizar')));
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Emite que a solicitação foi enviada  */
  private log(message: string) {
    const toast: Toast = {
      type: 'warning',
      body: message,
    };
    this.toasterService.pop(toast);
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
