import { Injectable } from '@angular/core';

@Injectable()
export class AgendamentoConf {
    public server = 'http://localhost:55103';
    public apiUrl = '/api/v1/agendamento/';
    public serverWithApiUrl = this.server + this.apiUrl;
}
