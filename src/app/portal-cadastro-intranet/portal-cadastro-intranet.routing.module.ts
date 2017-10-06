import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PortalCadastroIntranetComponent} from './portal-cadastro-intranet.component';

const routes: Routes = [{
  path: '',
  component: PortalCadastroIntranetComponent,
  children: [],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortalRoutingModule {
}
