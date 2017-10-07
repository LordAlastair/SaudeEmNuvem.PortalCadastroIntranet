import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PortalCadastroIntranetComponent } from './portal-cadastro-intranet.component';

const routes: Routes = [{
  path: '',
  component: PortalCadastroIntranetComponent,
  children: [ {
    path: 'paciente',
    loadChildren: './paciente/paciente.module#PacienteModule',
  }, {
    path: '',
    redirectTo: 'paciente',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PortalRoutingModule {
}
