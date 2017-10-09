import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { PacienteRoutingModule, routedComponents } from './paciente-routing.module';
import { ShowErrorsComponent } from './validators/show-errors.component';
import { DataNascimentoValidatorDirective } from './validators/data-nascimento-validator.directive';

@NgModule({
    imports: [
        ThemeModule,
        PacienteRoutingModule,
    ],
    declarations: [
        ...routedComponents,
        ShowErrorsComponent,
        DataNascimentoValidatorDirective,
    ],
})
export class PacienteModule { }
