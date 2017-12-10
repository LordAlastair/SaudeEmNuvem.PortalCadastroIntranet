import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators';
import { ToasterService, Toast } from 'angular2-toaster';
import { Medico } from '../_models/medico';
import { HttpWrapperService } from './httpWrapper.service';
import { Configuration } from '../_shared/configuration';


@Injectable()
export class MedicoDataService {
  public actionUrl: string;
  constructor(private http: HttpWrapperService, private configuration: Configuration) {
    this.actionUrl = configuration.server + configuration.apiUrl + 'medico/';
  }
  buscarTodos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.actionUrl)
      .pipe(catchError(this.handleError<Medico[]>('buscarTodos')));
  }
  buscarPorCodigo(codigo: Number): Observable<Medico> {
    return this.http.get<Medico>(this.actionUrl + codigo)
      .pipe(catchError(this.handleError<Medico>('buscarPorLogin')));
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
}