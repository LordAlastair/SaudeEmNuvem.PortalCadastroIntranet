import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AgendamentoRoutingModule, routedComponents } from './agendamento-routing.module';

@NgModule({
    imports: [
        ThemeModule,
        AgendamentoRoutingModule,
        Ng2SmartTableModule,
    ],
    declarations: [
        ...routedComponents,
    ],
})
export class AgendamentoModule { }
