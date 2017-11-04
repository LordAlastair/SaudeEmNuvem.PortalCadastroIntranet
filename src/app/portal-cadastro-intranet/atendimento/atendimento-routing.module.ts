import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    AtendimentoCadastroPacienteComponent,
} from './atendimento-cadastro-paciente/atendimento-cadastro-paciente.component';
import {
    AtendimentoPesquisarProtocoloComponent,
} from './atendimento-pesquisar-protocolo/atendimento-pesquisar-protocolo.component';
import {
    AtendimentoVisualizarProtocolosSessaoComponent,
} from './atendimento-visualizar-protocolos-sessao/atendimento-visualizar-protocolos-sessao.component';
import { AtendimentoComponent } from './atendimento.component';

const routes: Routes = [{
    path: '',
    component: AtendimentoComponent,
    children: [{
        path: 'cadastro',
        component: AtendimentoCadastroPacienteComponent,
    }, {
        path: 'visualizarSessao',
        component: AtendimentoVisualizarProtocolosSessaoComponent,
    }, {
        path: 'pesquisar',
        component: AtendimentoPesquisarProtocoloComponent,
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
    AtendimentoVisualizarProtocolosSessaoComponent,
    AtendimentoPesquisarProtocoloComponent,
];
