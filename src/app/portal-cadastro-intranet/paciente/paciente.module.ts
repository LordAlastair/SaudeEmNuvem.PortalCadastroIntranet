import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PacienteRoutingModule, routedComponents } from './paciente-routing.module';
import { ShowErrorsComponent } from './validators/show-errors.component';
import { DataNascimentoValidatorDirective } from './validators/data-nascimento-validator.directive';
import { PacienteService } from '../_services/paciente.service';

@NgModule({
    imports: [
        ThemeModule,
        PacienteRoutingModule,
        Ng2SmartTableModule,
    ],
    declarations: [
        ...routedComponents,
        ShowErrorsComponent,
        DataNascimentoValidatorDirective,
    ],
    providers: [
        PacienteService,
    ],
})
export class PacienteModule { }
