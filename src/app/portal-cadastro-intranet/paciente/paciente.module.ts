import { CpfPipe } from '../_pipe/cpf.pipe';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PacienteRoutingModule, routedComponents } from './paciente-routing.module';
import { ShowErrorsComponent } from './validators/show-errors.component';
import { DataNascimentoValidatorDirective } from './validators/data-nascimento-validator.directive';
import { TextMaskModule } from 'angular2-text-mask';
import {
    PacientePesquisarCadastroPorNomeComponent,
} from './paciente-pesquisar-cadastro-por-nome/paciente-pesquisar-cadastro-por-nome.component';
import { PacientePesquisarCadastroComponent } from './paciente-pesquisar-cadastro/paciente-pesquisar-cadastro.component';

@NgModule({
    imports: [
        ThemeModule,
        PacienteRoutingModule,
        Ng2SmartTableModule,
        TextMaskModule,
    ],
    declarations: [
        ...routedComponents,
        ShowErrorsComponent,
        DataNascimentoValidatorDirective,
        CpfPipe,
    ],
    exports: [
        PacientePesquisarCadastroPorNomeComponent,
        PacientePesquisarCadastroComponent,
    ],
})
export class PacienteModule { }
