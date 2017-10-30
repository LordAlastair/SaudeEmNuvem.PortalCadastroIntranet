import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacienteComponent } from './paciente.component';

import { PacienteAlterarCadastroComponent } from './paciente-alterar-cadastro/paciente-alterar-cadastro.component';
// tslint:disable-next-line:max-line-length
import { PacientePesquisarCadastroComponent } from './paciente-pesquisar-cadastro/paciente-pesquisar-cadastro.component';
// tslint:disable-next-line:max-line-length
import { PacienteRealizarCadastroComponent } from './paciente-realizar-cadastro/paciente-realizar-cadastro.component';
// tslint:disable-next-line:max-line-length
import { PacienteVisualizarCadastroComponent } from './paciente-visualizar-cadastro/paciente-visualizar-cadastro.component';

const routes: Routes = [{
    path: '',
    component: PacienteComponent,
    children: [{
        path: 'alterar',
        component: PacienteAlterarCadastroComponent,
    }, {
        path: 'pesquisar',
        component: PacientePesquisarCadastroComponent,
    }, {
        path: 'cadastrar',
        component: PacienteRealizarCadastroComponent,
    }, {
        path: 'visualizar',
        component: PacienteVisualizarCadastroComponent,
    }],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class PacienteRoutingModule {
}

export const routedComponents = [
    PacienteComponent,
    PacienteAlterarCadastroComponent,
    PacientePesquisarCadastroComponent,
    PacienteRealizarCadastroComponent,
    PacienteVisualizarCadastroComponent,
];
