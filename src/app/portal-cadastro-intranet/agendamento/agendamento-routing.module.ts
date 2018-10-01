import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    AgendamentoNovoComponent,
} from './agendamento-novo/agendamento-novo.component';
import { AgendamentoComponent } from './agendamento.component';


const routes: Routes = [{
    path: '',
    component: AgendamentoComponent,
    children: [{
        path: 'novo',
        component: AgendamentoNovoComponent,
    }],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class AgendamentoRoutingModule {
}

export const routedComponents = [
    AgendamentoComponent,
    AgendamentoNovoComponent,
];
