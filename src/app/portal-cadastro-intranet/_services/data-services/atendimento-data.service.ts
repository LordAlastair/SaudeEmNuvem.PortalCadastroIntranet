import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import { HttpWrapperService } from '../httpWrapper.service';
import { CadastroConf } from '../../_shared/CadastroConf';
import { Atendimento } from '../../_models/atendimento';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators';
import { ToasterService, Toast } from 'angular2-toaster';
import * as uuidv4 from 'uuid/v4';

@Injectable()
export class AtendimentoDataService {

    public actionUrl: string;

    constructor(private http: HttpWrapperService, private configuration: CadastroConf,
        private toasterService: ToasterService) {
        this.actionUrl = configuration.server + configuration.apiUrl + 'atendimento/';
    }

    buscarTodos(): Observable<Atendimento[]> {
        return this.http.get<Atendimento[]>(this.actionUrl)
            .pipe(catchError(this.handleError<Atendimento[]>('buscarTodos')));
    }

    buscarPorCodigo(codigo: number): Observable<Atendimento> {
        return this.http.get<Atendimento>(this.actionUrl + codigo)
            .pipe(catchError(this.handleError<Atendimento>('buscarPorCodigo')));
    }

    gerarProtocoloPacienteRealizarCadastro(codigoPaciente): Observable<Atendimento> {
        const atendimento: Atendimento = {
            'chaveNatural': uuidv4(),
            'tipo': 'Cadastro de Paciente',
            'data': new Date(),
            'atendente': 'Bruna Lopes',
            'paciente': codigoPaciente,
        };

        return this.http.post<Atendimento>(this.actionUrl, atendimento).pipe(
            tap(() => this.log('Protocolo solicitado')),
            catchError(this.handleError<Atendimento>('criar')),
        );
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
