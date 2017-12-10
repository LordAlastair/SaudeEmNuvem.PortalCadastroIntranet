import { forEach } from '@angular/router/src/utils/collection';
import { Data } from '@agm/core/services/google-maps-types';
import { AgendaDataService } from '../../_services/data-services/agenda-data.service';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { CadastroService } from '../../_services/cadastroService';
import { Agenda } from '../../_models/agenda';
import { Consulta } from '../../_models/consulta';
import { MedicoDataService } from '../../_services/medico-data.service';
import { colors } from '../../_util/calendar/colors';
import { Subject } from 'rxjs/Subject';
import { DayViewHour } from 'calendar-utils';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'ngx-calendario-diario',
  templateUrl: './agenda-calendario-horarios-dia.component.html',
  styleUrls: ['./agenda-calendario-horarios-dia.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgendaCalendarioHorariosDiaComponent implements OnInit {
  @Input() locale = 'pt-br';

  @Input() events: CalendarEvent[] = [];
  @Input() selectedDayViewDate: Date;
  @Input() viewDate: Date = new Date();
  view: 'day';
  dayView: DayViewHour[] = [];


  constructor(
    private cadastroService: CadastroService,
    private agendaService: AgendaDataService,
    private medicoService: MedicoDataService,
  ) { }

  ngOnInit() {
    this.cadastroService.emitirDiaSelecionado.subscribe(
      dia => {
        this.carregarDiaSelecionado(dia);
      },
    );
    console.log('passei no ngInit');
  }


  refresh: Subject<any> = new Subject();

  // carregarDiaSelecionado(dia: Date) {
  //   this.events = [];
  //   this.agendaService.buscarConsultasAbertas()
  //     .subscribe(agendas => {
  //       if (agendas !== undefined) {
  //         let i = 0;
  //         for (i = 0; i < agendas.length; i++) { // considerando que você só vai buscar as consultas marcadas
  //           this.carregarEvento(agendas[i]);
  //         }
  //       }
  //     });
  // }

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
        this.viewDate = new Date(dia);
        this.refresh.next();
        console.log(this.events);
      });
  }

  carregarEvento(agenda: Agenda) {
    console.log('passei aqui');
    const horario = new Date(agenda.horario);
    let cor = colors.red;

    if (agenda.situacao === 'Aberta') {
      cor = colors.blue;
    }

    this.events.push({
      title: 'Algum medico' + agenda.idMedico,
      start: new Date(agenda.horario),
      end: new Date(horario.setHours(horario.getHours() + 1)),
      color: cor,
      draggable: false,
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
    });

  }

  private addSelectedDayViewClass() {
    this.dayView.forEach(hourSegment => {
      hourSegment.segments.forEach(segment => {
        delete segment.cssClass;
        if (
          this.selectedDayViewDate &&
          segment.date.getTime() === this.selectedDayViewDate.getTime()
        ) {
          segment.cssClass = 'cal-day-selected';
        }
      });
    });
  }

  horarioSelecionado(date: Date) {
    this.selectedDayViewDate = date;
    this.addSelectedDayViewClass();
  }
}
