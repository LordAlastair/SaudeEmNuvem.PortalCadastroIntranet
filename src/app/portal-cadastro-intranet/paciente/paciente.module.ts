import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PacienteRoutingModule, routedComponents } from './paciente-routing.module';
import { ShowErrorsComponent } from './validators/show-errors.component';
import { DataNascimentoValidatorDirective } from './validators/data-nascimento-validator.directive';
import { PacienteService } from '../_services/paciente.service';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { CustomDatepickerI18n, I18n } from '../_services/CustomDatepickerI18n';

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
        [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }],
    ],
})
export class PacienteModule { }
