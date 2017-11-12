import { NgModule } from '@angular/core';

import { ThemeModule } from '../@theme/theme.module';
import { AtendimentoService } from './_services/atendimento.service';
import { PacienteDataService } from './_services/data-services/paciente-data.service';
import { PacienteService } from './_services/paciente.service';
import { PouchDBService } from './_services/pouchdb.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { PortalRoutingModule } from './portal-cadastro-intranet-routing.module';
import { PortalCadastroIntranetComponent } from './portal-cadastro-intranet.component';
import { Configuration } from './_shared/configuration';
import { HttpWrapperService } from './_services/httpWrapper.service';

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
    PacienteService,
    Configuration,
    AtendimentoService,
    PacienteDataService,
    [PouchDBService],
    HttpWrapperService,
],
})

export class PortalCadastroIntranetModule { }
