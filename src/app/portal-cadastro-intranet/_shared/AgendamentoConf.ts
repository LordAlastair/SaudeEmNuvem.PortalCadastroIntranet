import { Injectable } from '@angular/core';

@Injectable()
export class AgendamentoConf {
    public server = 'http://localhost:5103';
    public apiUrl = '/api/v1/agendamento/';
    public serverWithApiUrl = this.server + this.apiUrl;
}
