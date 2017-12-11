import { AgendaDataService } from '../../_services/data-services/agenda-data.service';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { CadastroService } from '../../_services/cadastroService';
import { Agenda } from '../../_models/agenda';
import { Consulta } from '../../_models/consulta';
import { MedicoDataService } from '../../_services/medico-data.service';
import { colors } from '../../_util/calendar/colors';
import { Subject } from 'rxjs/Subject';
import { DayViewHour } from 'calendar-utils';
import { Medico } from '../../_models/medico';
import { Event } from '../../_models/event';

@Component({
  selector: 'ngx-calendario-diario',
  templateUrl: './agenda-calendario-horarios-dia.component.html',
  styleUrls: ['./agenda-calendario-horarios-dia.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AgendaCalendarioHorariosDiaComponent implements OnInit {
  locale = 'pt-br';

  events: Array<CalendarEvent<{ idMedico: number, idEvent: number }>> = [];
  selectedDayViewDate: Date;
  viewDate: Date = new Date();
  view: 'day';
  dayView: DayViewHour[] = [];
  medicos: Medico[] = [];
  eventoSelecionado;
  agendas: Agenda[] = [];

  constructor(
    private cadastroService: CadastroService,
    private agendaService: AgendaDataService,
    private medicoService: MedicoDataService,
  ) { }

  ngOnInit() {
    this.medicoService.buscarTodos().subscribe(data => this.medicos = data);
    this.cadastroService.emitirDiaSelecionado.subscribe(
      dia => {
        this.carregarDiaSelecionado(dia);
      },
    );
  }

  refresh: Subject<any> = new Subject();

  carregarDiaSelecionado(dia: Date) {
    this.events = [];
    this.agendaService.buscarConsultasAbertasDia(dia)
      .subscribe(agendas => {
        if (agendas !== undefined) {
          let i = 0;
          for (i = 0; i < agendas.length; i++) { // considerando que você só vai buscar as consultas marcadas
            this.carregarEvento(agendas[i]);
          }
        }

        this.agendas = agendas;
        this.viewDate = new Date(dia);
        this.refresh.next();
      });
  }

  carregarEvento(agenda: Agenda) {
    const m = this.medicos.findIndex(x => x.idMedico === agenda.idMedico);
    const horario = new Date(agenda.horario);

    this.events.push({
      title: this.medicos[m].nome,
      start: new Date(agenda.horario),
      end: new Date(horario.setHours(horario.getHours() + 1)),
      color: colors.blue,
      draggable: false,
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      meta: {
        idMedico: m,
        idEvent: this.events.length,
      },
    });
  }

  filtrarPormedico(id: number) {
    const filtro = this.events.filter(x => x.meta.idEvent === id);
    this.refresh.next();
  }

  horarioSelecionado(evento): void {
    if (this.eventoSelecionado !== undefined) {
      this.events[this.eventoSelecionado.event.meta.idEvent].color = colors.blue;
    }
    this.events[evento.event.meta.idEvent].color = colors.red;
    this.eventoSelecionado = evento;
    const m = this.medicos.findIndex(x => x.idMedico === this.eventoSelecionado.event.idMedico);
    this.cadastroService.horarioSelecionado(this.agendas[this.eventoSelecionado.event.meta.idEvent]);
  }
}
