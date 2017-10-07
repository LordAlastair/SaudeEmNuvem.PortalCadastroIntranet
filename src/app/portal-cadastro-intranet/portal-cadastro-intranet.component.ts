import { Component } from '@angular/core';
import { MENU_ITEMS_PORTAL } from './portal-cadastro-intranet-menu';

@Component({
  selector: 'ngx-portal-cadastro-intranet',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PortalCadastroIntranetComponent {
  menu = MENU_ITEMS_PORTAL;
}
