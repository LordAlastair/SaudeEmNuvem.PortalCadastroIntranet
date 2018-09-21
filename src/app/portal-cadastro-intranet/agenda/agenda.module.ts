import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { routedComponents, AgendaRoutingModule } from './agenda-routing.module';
import { NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'angular-calendar';
import { AgendaCalendarioHorariosDiaComponent } from './agenda-calendario-horarios-dia/agenda-calendario-horarios-dia.component';
import { AgendaCalendarioMensalComponent } from './agenda-calendario-mensal/agenda-calendario-mensal.component';

@NgModule({
  imports: [
    ThemeModule,
    AgendaRoutingModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    CalendarModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  exports: [
    AgendaCalendarioMensalComponent,
    AgendaCalendarioHorariosDiaComponent,
  ],
})
export class AgendaModule { }
