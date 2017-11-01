import { NgModule } from '@angular/core';
import { PortalCadastroIntranetComponent } from './portal-cadastro-intranet.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PortalRoutingModule } from './portal-cadastro-intranet-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { PacienteService } from './_services/paciente.service';
import { AtendimentoService } from './_services/atendimento.service';


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
    AtendimentoService,
],
})

export class PortalCadastroIntranetModule { }
