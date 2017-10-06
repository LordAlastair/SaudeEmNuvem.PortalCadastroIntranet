import {NgModule} from '@angular/core';

import {PortalCadastroIntranetComponent} from './portal-cadastro-intranet.component';
import {PortalRoutingModule} from './portal-cadastro-intranet.routing.module';
import {ThemeModule} from '../@theme/theme.module';
import {DashboardComponent} from './dashboard/dashboard.component';

const PORTAL_COMPONENTS = [
  PortalCadastroIntranetComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    PortalRoutingModule,
  ],
  declarations: [
    ...PORTAL_COMPONENTS,
    DashboardComponent,
  ],
})
export class PortalComponent {
}
