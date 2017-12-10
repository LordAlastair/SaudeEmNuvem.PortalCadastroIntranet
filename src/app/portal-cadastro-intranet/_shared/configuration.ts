import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public server = 'http://192.168.255.9:54321/';
    public apiUrl = 'api/';
    public serverWithApiUrl = this.server + this.apiUrl;
}
