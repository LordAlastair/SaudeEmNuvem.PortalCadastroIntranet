import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtendimentoComponent } from './atendimento.component';
import { AtendimentoCadastroPacienteComponent } from './atendimento-cadastro-paciente/atendimento-cadastro-paciente.component';
// tslint:disable-next-line:max-line-length

const routes: Routes = [{
    path: '',
    component: AtendimentoComponent,
    children: [{
        path: 'cadastro',
        component: AtendimentoCadastroPacienteComponent,
    }],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class AtendimentoRoutingModule {
}

export const routedComponents = [
    AtendimentoComponent,
    AtendimentoCadastroPacienteComponent,
];
