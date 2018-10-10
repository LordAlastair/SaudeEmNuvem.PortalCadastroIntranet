import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {
  AgendamentoRoutingModule,
  routedComponents,
} from './agendamento-routing.module';
import {
  NgbDatepickerModule,
  NgbTimepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'angular-calendar';
import { MyCalendarModule } from '../_util/calendar/my-calendar.module';

@NgModule({
  imports: [
    ThemeModule,
    AgendamentoRoutingModule,
    Ng2SmartTableModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    CalendarModule,
    MyCalendarModule,
  ],
  declarations: [...routedComponents],
})
export class AgendamentoModule {}
