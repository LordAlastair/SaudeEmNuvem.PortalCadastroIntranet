import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PortalCadastroIntranetComponent } from './portal-cadastro-intranet.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: PortalCadastroIntranetComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  }, {
    path: 'paciente',
    loadChildren: './paciente/paciente.module#PacienteModule',
  }, {
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
