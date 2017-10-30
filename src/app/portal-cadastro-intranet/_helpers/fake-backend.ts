/*
    The fake backend provider enables the example to run without a backend / backendless,
    it uses HTML5 local storage for storing registered user data
    and provides fake implementations for authentication and CRUD methods,
    these would be handled by a real api and database in a production application.

    It uses the Angular 2 MockBackend to replace the default backend used by the Http service,
    the MockBackend enables you to intercept http requests made within the application and provide fake responses,
    it's also used for unit testing.
*/
import {
    Http,
    BaseRequestOptions,
    Response, ResponseOptions,
    RequestMethod,
    XHRBackend,
    RequestOptions,
} from '@angular/http';

import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {
    // array in local storage for registered pacientes
    const pacientes: any[] = JSON.parse(localStorage.getItem('pacientes')) || [];

    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {
        // wrap in timeout to simulate server api call
        setTimeout(() => {

            // authenticate
            if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
                // get parameters from post request
                const params = JSON.parse(connection.request.getBody());

                // find if any user matches login credentials
                const filteredPacientes = pacientes.filter(user => {
                    return user.username === params.username && user.password === params.password;
                });

                if (filteredPacientes.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    const paciente = filteredPacientes[0];
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: {
                            codigo: paciente.codigo,
                            nome: paciente.nome,
                            apelido: paciente.firstName,
                            token: 'fake-jwt-token',
                        },
                    })));
                } else {
                    // else return 400 bad request
                    connection.mockError(new Error('Username or password is incorrect'));
                }

                return;
            }

            // get pacientes
            if (connection.request.url.endsWith('/api/pacientes') && connection.request.method === RequestMethod.Get) {
                connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: pacientes })));
                return;
            }

            // get user by id
            if (connection.request.url.match(/\/api\/pacientes\/\d+$/)
                && connection.request.method === RequestMethod.Get) {
                    // find paciente by id in pacientes array
                    let urlParts = connection.request.url.split('/');
                    let codigo = parseInt(urlParts[urlParts.length - 1]);
                    let matchedpacientes = pacientes.filter(user => { return paciente.codigo === codigo; });
                    let paciente = matchedpacientes.length ? matchedpacientes[0] : null;

                    // respond 200 OK with paciente
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: paciente })));
                    return;
            }

            // create user
            if (connection.request.url.endsWith('/api/pacientes') && connection.request.method === RequestMethod.Post) {
                // get new user object from post body
                let novoPaciente = JSON.parse(connection.request.getBody());

                // save new user
                novoPaciente.codigo = pacientes.length + 1;
                pacientes.push(novoPaciente);
                localStorage.setItem('pacientes', JSON.stringify(pacientes));

                // respond 200 OK
                connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

                return;
            }

            // delete user
            if (connection.request.url.match(/\/api\/pacientes\/\d+$/) && connection.request.method === RequestMethod.Delete) {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in pacientes array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < pacientes.length; i++) {
                        let user = pacientes[i];
                        if (user.id === id) {
                            // delete user
                            pacientes.splice(i, 1);
                            localStorage.setItem('pacientes', JSON.stringify(pacientes));
                            break;
                        }
                    }

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }

            // pass through any requests not handled above
            let realHttp = new Http(realBackend, options);
            let requestOptions = new RequestOptions({
                method: connection.request.method,
                headers: connection.request.headers,
                body: connection.request.getBody(),
                url: connection.request.url,
                withCredentials: connection.request.withCredentials,
                responseType: connection.request.responseType,
            });
            realHttp.request(connection.request.url, requestOptions)
                .subscribe((response: Response) => {
                    connection.mockRespond(response);
                },
                (error: any) => {
                    connection.mockError(error);
                });

        }, 500);

    });

    return new Http(backend, options);
};

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions, XHRBackend],
};
