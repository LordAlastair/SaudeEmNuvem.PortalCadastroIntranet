import { NgModule } from '@angular/core';
import { AtendimentoComponent } from './atendimento.component';
import { routedComponents, AtendimentoRoutingModule } from './atendimento-routing.module';

@NgModule({
    imports: [
        AtendimentoRoutingModule,
    ],
    declarations: [
        AtendimentoComponent,
        ...routedComponents,
    ],
})
export class AtendimentoModule { }
