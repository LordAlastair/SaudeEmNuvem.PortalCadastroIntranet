import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import { HttpWrapperService } from '../httpWrapper.service';
import { Configuration } from '../../_shared/configuration';
import { Agenda } from '../../_models/agenda';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators';
import { ToasterService, Toast } from 'angular2-toaster';
import { Cacheable } from '../cacheable';
import { Prontuario } from '../../_models/prontuario';
import { Consulta } from '../../_models/consulta';

@Injectable()
export class AgendaDataService {

    private serverList: Cacheable<string[]> = new Cacheable<string[]>();
    public actionUrl: string;

    constructor(private http: HttpWrapperService, private configuration: Configuration, private toasterService: ToasterService) {
        this.actionUrl = configuration.server + configuration.apiUrl + 'agenda/';
    }

    // Retorna todas as consulta marcada para o medico com o id informado
    buscarConsultasMarcadaPorMedico(codigo: number): Observable<Agenda[]> {
        return this.http.get<Agenda[]>(this.actionUrl + 'GetConsultasDoDiaPorMedico/' + codigo)
            .pipe(catchError(this.handleError<Agenda[]>('buscarConsultasMarcadaPorMedico')));
    }

    buscarConsultasAbertas(): Observable<Agenda[]> {
        return this.http.get<Agenda[]>(this.actionUrl + 'GetConsultasAbertas/')
            .pipe(catchError(this.handleError<Agenda[]>('buscarConsultasAbertas')));
    }

    temConsultasAbertasDia(dia: Date): Observable<number> {
        return this.http.get<number>(this.actionUrl + 'TemConsultasAbertas/' + dia.toDateString())
            .pipe(catchError(this.handleError<number>('temConsultasAbertasDia')));
    }

    buscarConsultasAbertasDia(dia: Date): Observable<Agenda[]> {
        return this.http.get<Agenda[]>(this.actionUrl + 'GetConsultasAbertasDia/' + dia.toDateString())
            .pipe(catchError(this.handleError<Agenda[]>('buscarConsultasAbertasDia')));
    }

    buscarPorCodigo(codigo: number): Observable<Agenda> {
        return this.http.get<Agenda>(this.actionUrl + codigo)
            .pipe(catchError(this.handleError<Agenda>('buscarPorCodigo')));
    }

    criar(agenda: Agenda): Observable<Agenda> {
        return this.http.post<Agenda>(this.actionUrl, agenda).pipe(
            tap((data: Agenda) => this.log('Solicitação de cadastro iniciada')),
            catchError(this.handleError<Agenda>('criar')),
        );
    }

    criarConsulta(consulta: Consulta): Observable<Consulta> {
        return this.http.post<Consulta>(this.configuration.server + this.configuration.apiUrl + 'consulta/', consulta).pipe(
            tap((data: Consulta) => this.log('Solicitação de cadastro iniciada')),
            catchError(this.handleError<Consulta>('criar')),
        );
    }

    mudarParaMarcado(codigo: number): Observable<Agenda> {
        return this.http.get<Agenda>(this.actionUrl + 'finalizarConsulta/' + codigo)
            .pipe(catchError(this.handleError<Agenda>('mudarParaMarcado')));
    }

    atualizar(codigo: number, agenda: Agenda): Observable<Agenda> {
        return this.http.put<Agenda>(this.actionUrl + codigo, JSON.stringify(agenda))
            .pipe(catchError(this.handleError<Agenda>('atualizar')));
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
