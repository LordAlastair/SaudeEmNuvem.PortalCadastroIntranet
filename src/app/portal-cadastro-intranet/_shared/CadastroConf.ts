import { Injectable } from '@angular/core';

@Injectable()
export class CadastroConf {
    public server = 'http://localhost:5102/';
    public apiUrl = 'api/v1/Cadastro';
    public serverWithApiUrl = this.server + this.apiUrl;
}
