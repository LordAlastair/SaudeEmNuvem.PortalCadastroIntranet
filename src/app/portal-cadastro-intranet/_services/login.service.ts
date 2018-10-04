import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

    constructor( private http: HttpClient,
        private router: Router) {
    }

    async authenticate(credentials: any): Promise<any> {
        try {
            const token = await this.http.post<any>('v1/autenticar', credentials).toPromise();
            if (token) {
                this.router.navigate(['/']);
                const manterConctado = localStorage.getItem('manterConectado');
                if (manterConctado === 'true') {
                    localStorage.setItem('api_token', JSON.stringify(token.data));
                } else {
                    sessionStorage.setItem('api_token', JSON.stringify(token.data));
                }
                return token;
            }

            return null;
        } catch (error) {
            return false;
        }
    }
}
