import { NgModule } from '@angular/core';

import { PortalCadastroIntranetComponent } from './portal-cadastro-intranet.component';
import { PortalRoutingModule } from './portal-cadastro-intranet-routing.module';
import { ThemeModule } from '../@theme/theme.module';

const COMPONENTS = [
  PortalCadastroIntranetComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    PortalRoutingModule,
  ],
  declarations: [
    ...COMPONENTS,
  ],
})

export class PortalComponent {
}
