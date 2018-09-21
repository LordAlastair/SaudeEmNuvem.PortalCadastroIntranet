import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgendaComponent } from './agenda.component';
import { AgendaCalendarioMensalComponent } from './agenda-calendario-mensal/agenda-calendario-mensal.component';
import { AgendaCalendarioHorariosDiaComponent } from './agenda-calendario-horarios-dia/agenda-calendario-horarios-dia.component';


const routes: Routes = [{
  path: '',
  component: AgendaComponent,
  children: [{
    path: 'mensal',
    component: AgendaCalendarioMensalComponent,
  }, {
    path: 'horariosDia',
    component: AgendaCalendarioHorariosDiaComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AgendaRoutingModule {
}

export const routedComponents = [
  AgendaComponent,
  AgendaCalendarioMensalComponent,
  AgendaCalendarioHorariosDiaComponent,
];
