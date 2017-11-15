import { NgModule } from '@angular/core';

import { ThemeModule } from '../@theme/theme.module';
import { PacienteDataService } from './_services/data-services/paciente-data.service';
import { PouchDBService } from './_services/pouchdb.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { PortalRoutingModule } from './portal-cadastro-intranet-routing.module';
import { PortalCadastroIntranetComponent } from './portal-cadastro-intranet.component';
import { Configuration } from './_shared/configuration';
import { HttpWrapperService } from './_services/httpWrapper.service';
import { AtendimentoDataService } from './_services/data-services/atendimento-data.service';

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
  providers: [
    AtendimentoDataService,
    Configuration,
    PacienteDataService,
    [PouchDBService],
    HttpWrapperService,
],
})

export class PortalCadastroIntranetModule { }
