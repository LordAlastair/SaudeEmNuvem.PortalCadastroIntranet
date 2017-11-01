import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
// import { AtendimentoComponent } from './atendimento.component';
import { routedComponents, AtendimentoRoutingModule } from './atendimento-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
    imports: [
        ThemeModule,
        AtendimentoRoutingModule,
        Ng2SmartTableModule,
    ],
    declarations: [
        // AtendimentoComponent,
        ...routedComponents,
    ],
})
export class AtendimentoModule { }
