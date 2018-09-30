import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PortalCadastroIntranetComponent } from './portal-cadastro-intranet.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../auth-guard.service';

const routes: Routes = [{
  path: '',
  component: PortalCadastroIntranetComponent,
  children: [{
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
  }, {
    path: 'paciente',
    canActivate: [AuthGuard],
    loadChildren: './paciente/paciente.module#PacienteModule',
  }, {
    path: 'atendimento',
    canActivate: [AuthGuard],
    loadChildren: './atendimento/atendimento.module#AtendimentoModule',
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PortalRoutingModule {
}
