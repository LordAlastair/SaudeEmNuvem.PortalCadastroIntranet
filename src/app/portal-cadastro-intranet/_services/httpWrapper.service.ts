import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpWrapperService {
    constructor(private http: HttpClient) { }

    get<T>(url: string): Observable<T> {
        return this.http.get<T>(url);
    }

    post<T>(url: string, body: any): Observable<T> {
        return this.http.post<T>(url, body);
    }

    put<T>(url: string, body: string): Observable<T> {
        return this.http.put<T>(url, body);
    }

    delete<T>(url: string): Observable<T> {
        return this.http.delete<T>(url);
    }

    patch<T>(url: string, body: string): Observable<T> {
        return this.http.patch<T>(url, body);
    }
}
/**
 * Este HttpInterceptor adiciona o header necessario para o Cors;
 * @export
 * @class CustomInterceptor
 * @implements {HttpInterceptor}
 */
@Injectable()
export class CustomInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }

        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        return next.handle(req);
    }
}
