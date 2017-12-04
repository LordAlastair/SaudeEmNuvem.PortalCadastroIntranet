import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { routedComponents, AgendaRoutingModule } from './agenda-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    AgendaRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  exports: [],
})
export class AgendaModule { }
