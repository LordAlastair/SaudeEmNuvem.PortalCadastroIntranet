import { NgModule } from '@angular/core';
import { PortalCadastroIntranetComponent } from './portal-cadastro-intranet.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PortalRoutingModule } from './portal-cadastro-intranet-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

const COMPONENTS = [
  PortalCadastroIntranetComponent,
];

@NgModule({
  imports: [
    PortalRoutingModule,
    ThemeModule,
    DashboardModule,
  ],
  declarations: [
    ...COMPONENTS,
  ],
})

export class PortalCadastroIntranetModule {
}
