import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PacienteRoutingModule, routedComponents } from './paciente-routing.module';
import { ShowErrorsComponent } from './validators/show-errors.component';
import { DataNascimentoValidatorDirective } from './validators/data-nascimento-validator.directive';
import { PacienteService } from '../_services/paciente.service';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { CpfPipe } from '../_pipe/cpf.pipe';
import { TextMaskModule } from 'angular2-text-mask';
import { ValidatorsModule } from 'ngx-brazilian-helpers';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
    imports: [
        ThemeModule,
        PacienteRoutingModule,
        Ng2SmartTableModule,
        TextMaskModule,
        ValidatorsModule,
        DatepickerModule.forRoot(),
        BsDatepickerModule.forRoot(),
    ],
    declarations: [
        ...routedComponents,
        ShowErrorsComponent,
        DataNascimentoValidatorDirective,
        CpfPipe,
    ],
    providers: [
        PacienteService,
    ],
})
export class PacienteModule { }
