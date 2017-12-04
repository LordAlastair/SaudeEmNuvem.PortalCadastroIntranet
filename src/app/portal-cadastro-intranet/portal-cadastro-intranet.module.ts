import { NgModule } from '@angular/core';

import { ThemeModule } from '../@theme/theme.module';
import { PacienteDataService } from './_services/data-services/paciente-data.service';
import { PouchDBService } from './_services/pouchdb.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { PortalRoutingModule } from './portal-cadastro-intranet-routing.module';
import { PortalCadastroIntranetComponent } from './portal-cadastro-intranet.component';
import { Configuration } from './_shared/configuration';
import { HttpWrapperService } from './_services/httpWrapper.service';
import { AtendimentoDataService } from './_services/data-services/atendimento-data.service';

import { CalendarModule } from 'angular-calendar';
import { CalendarHeaderComponent } from './_util/calendar/calendar-header.component';
import { DateTimePickerComponent } from './_util/calendar/date-time-picker.component';
import { NgbTimepickerModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

const COMPONENTS = [
  PortalCadastroIntranetComponent,
];

@NgModule({
  imports: [
    PortalRoutingModule,
    ThemeModule,
    DashboardModule,
    NgbDatepickerModule.forRoot(),
    NgbTimepickerModule.forRoot(),
    CalendarModule.forRoot(),
  ],
  declarations: [
    ...COMPONENTS,
    [CalendarHeaderComponent, DateTimePickerComponent],
  ],
  exports: [CalendarHeaderComponent, DateTimePickerComponent],
  providers: [
    AtendimentoDataService,
    Configuration,
    PacienteDataService,
    [PouchDBService],
    HttpWrapperService,
  ],
})

export class PortalCadastroIntranetModule { }
