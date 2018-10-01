import { NgModule } from '@angular/core';

import { ThemeModule } from '../@theme/theme.module';
import { PacienteDataService } from './_services/data-services/paciente-data.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { PortalRoutingModule } from './portal-cadastro-intranet-routing.module';
import { PortalCadastroIntranetComponent } from './portal-cadastro-intranet.component';
import { CadastroConf } from './_shared/CadastroConf';
import { HttpWrapperService } from './_services/httpWrapper.service';
import { AtendimentoDataService } from './_services/data-services/atendimento-data.service';
import { AgendamentoConf } from './_shared/AgendamentoConf';

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
    CadastroConf,
    AgendamentoConf,
    PacienteDataService,
    HttpWrapperService,
  ],
})

export class PortalCadastroIntranetModule { }
