import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import { HttpWrapperService } from '../httpWrapper.service';
import { AgendamentoConf } from '../../_shared/AgendamentoConf';
import { Paciente } from '../../_models/paciente';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators';
import { ToasterService, Toast } from 'angular2-toaster';
import { Consulta } from '../../_models/consulta';
import { CriarConsulta } from '../../_models/commands/criarConsulta';
import { Medico } from '../../_models/medico';

@Injectable()
export class AgendamentoDataService {

    public actionUrl: string;

    constructor(private http: HttpWrapperService, private configuration: AgendamentoConf,
        private toasterService: ToasterService) {
        this.actionUrl = configuration.server + configuration.apiUrl;
    }

    buscarTodosConsultas(): Observable<Consulta[]> {
        return this.http.get<Consulta[]>(this.actionUrl + 'GetConsultas')
            .pipe(catchError(this.handleError<Consulta[]>('GetConsultas')));
    }

    buscarTodosMedicos(): Observable<Medico[]> {
      return this.http.get<Medico[]>(this.actionUrl + 'GetMedicos')
          .pipe(catchError(this.handleError<Medico[]>('GetMedicos')));
  }

    buscarPorCodigo(codigo: number): Observable<Consulta> {
        return this.http.get<Consulta>(this.actionUrl + 'GetConsulta' + codigo)
            .pipe(catchError(this.handleError<Consulta>('GetConsulta')));
    }

    getConsultasPorMedico(codigo: number): Observable<Consulta> {
      return this.http.get<Consulta>(this.actionUrl + 'GetConsultasPorMedico' + codigo)
          .pipe(catchError(this.handleError<Consulta>('GetConsulta')));
    }

    getConsultasPorPaciente(codigo: number): Observable<Consulta> {
      return this.http.get<Consulta>(this.actionUrl + 'GetConsultasPorPaciente' + codigo)
          .pipe(catchError(this.handleError<Consulta>('GetConsulta')));
    }

    getConsultasMarcadasHoje(codigo: number): Observable<Consulta> {
      return this.http.get<Consulta>(this.actionUrl + 'ConsultasMarcadasHoje' + codigo)
          .pipe(catchError(this.handleError<Consulta>('ConsultasMarcadasHoje')));
    }

    criar(consulta: CriarConsulta): Observable<CriarConsulta> {
        return this.http.post<CriarConsulta>(this.actionUrl + 'Agendar', consulta).pipe(
            tap(() => this.log('Solicitação da consulta iniciada')),
            catchError(this.handleError<CriarConsulta>('Agendar')),
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
}
