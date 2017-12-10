import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { AgendaModule } from '../agenda/agenda.module';
import { CalendarModule } from 'angular-calendar';
import { NgbTimepickerModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        ThemeModule,
        AgendaModule,
    ],
    declarations: [
        DashboardComponent,
    ],
})
export class DashboardModule { }
