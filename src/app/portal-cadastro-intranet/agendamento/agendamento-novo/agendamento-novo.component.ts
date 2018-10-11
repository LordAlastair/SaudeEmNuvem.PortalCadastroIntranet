import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgendamentoNovoModalComponent } from '../agendamento-novo-modal/agendamento-novo-modal.component';
import { LocalDataSource } from 'ng2-smart-table';
import { PacienteDataService } from '../../_services/data-services/paciente-data.service';
import { AgendamentoDataService } from '../../_services/data-services/agendamento-data.service';

//#region Calendar
import {
  CalendarView,
  CalendarEvent,
  CalendarMonthViewDay,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
} from 'angular-calendar';
import {
  subMonths,
  addMonths,
  addDays,
  addWeeks,
  subDays,
  subWeeks,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  addHours,
  isSameMonth,
  isSameDay,
  addMinutes,
} from 'date-fns';
import { colors } from '../../_util/calendar/colors';
import { Subject } from 'rxjs';
import { DayViewHour } from 'calendar-utils';
import { Medico } from '../../_models/medico';

type CalendarPeriod = 'day' | 'week' | 'month';

function addPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: addDays,
    week: addWeeks,
    month: addMonths,
  }[period](date, amount);
}

function subPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: subDays,
    week: subWeeks,
    month: subMonths,
  }[period](date, amount);
}

function startOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: startOfDay,
    week: startOfWeek,
    month: startOfMonth,
  }[period](date);
}

function endOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: endOfDay,
    week: endOfWeek,
    month: endOfMonth,
  }[period](date);
}
//#endregion calendar

@Component({
  selector: 'ngx-agendamento-novo',
  templateUrl: './agendamento-novo.component.html',
  styleUrls: ['./agendamento-novo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AgendamentoNovoComponent implements OnInit {

  //#region Var
  locale: string = 'pt';
  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  @Input()
  selectedMonthViewDay: CalendarMonthViewDay;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  minDate: Date = subDays(new Date(), 1);

  maxDate: Date = addMonths(new Date(), 1);

  prevBtnDisabled: boolean = false;

  nextBtnDisabled: boolean = false;

  activeDayIsOpen: boolean = true;

  selectedDayViewDate: Date;

  dayView: DayViewHour[];

  selectedDays: any = [];

  selectedMed: Medico;

  public source: LocalDataSource;

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];
//#endregion

  //#region Table
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      chave: {
        title: 'Codigo',
        type: 'string',
      },
      nome: {
        title: 'Nome',
        type: 'string',
      },
      apelido: {
        title: 'Apelido',
        type: 'string',
      },
      dataNascimento: {
        title: 'Data Nascimento',
        type: 'date',
        valuePrepareFunction: dataNascimento => {
          const raw = new Date(dataNascimento);
          return raw.toLocaleDateString('en-Us');
        },
      },
    },
  };
  //#endregion

  constructor(
    private modal: NgbModal,
    private pacienteService: PacienteDataService,
    private agendamentoService: AgendamentoDataService,
  ) {
    this.dateOrViewChanged();
  }

  public ngOnInit() {
    this.preencherCalendar();
    this.carregarConsultas();
    // this.source = new LocalDataSource();
    // this.carregarPacientes();
    // const date = new Date();
    // const dias = this.diasNoMes(date.getMonth(), date.getFullYear());
    // this.carregarvagasDias(dias);
  }

  carregarConsultas(): void {
    this.agendamentoService.buscarTodosConsultas().subscribe(response => {
      response.forEach(element => {
        console.log(response);
       const aux = new Date(element.horarioMarcado);
        this.events.push(
          {
            start: element.horarioMarcado,
            end: new Date(aux.getTime() + 15 * 60000),
            title: element.medico.nome,
            color: colors.blue,
            actions: this.actions,
            resizable: {
              beforeStart: false,
              afterEnd: false,
            },
            draggable: false,
            meta: {
              idmed: element.medico.id,
              idPac: element.paciente.chaveNaturalCadSus,
              idtStatus: element.idtStatus,
            },
          },
        );
      });
    });
  }

  openModal(): void {
    const activeModal = this.modal.open(AgendamentoNovoModalComponent, {
      size: 'lg',
      container: 'nb-layout',
    });
    activeModal.componentInstance.modalHeader = 'Marcar Consulta';
    activeModal.componentInstance.medico = this.selectedMed;
    activeModal.componentInstance.dia = this.selectedDayViewDate;
  }

//#region Calendar constructor methods
  increment(): void {
    this.changeDate(addPeriod(this.view, this.viewDate, 1));
  }

  decrement(): void {
    this.changeDate(subPeriod(this.view, this.viewDate, 1));
  }

  today(): void {
    this.changeDate(new Date());
  }

  dateIsValid(date: Date): boolean {
    return date >= this.minDate && date <= this.maxDate;
  }

  changeDate(date: Date): void {
    this.viewDate = date;
    this.dateOrViewChanged();
  }

  dateOrViewChanged(): void {
    this.prevBtnDisabled = !this.dateIsValid(
      endOfPeriod(this.view, subPeriod(this.view, this.viewDate, 1)),
    );
    this.nextBtnDisabled = !this.dateIsValid(
      startOfPeriod(this.view, addPeriod(this.view, this.viewDate, 1)),
    );
    if (this.viewDate < this.minDate) {
      this.changeDate(this.minDate);
    } else if (this.viewDate > this.maxDate) {
      this.changeDate(this.maxDate);
    }
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      if (
        this.selectedDays.some(
          selectedDay => selectedDay.date.getTime() === day.date.getTime()
        )
      ) {
        day.cssClass = 'cal-day-selected';
      }
    });
  }
//#endregion

  preencherCalendar(): void {
  //   const year = this.minDate.getFullYear();
  //   const month = this.minDate.getMonth();
  //   let day = this.minDate.getDate();
  //   let min = this.minDate.getTime();
  //   let aux = new Date();
  //   const dates = [this.minDate];

  //   while (aux <= this.maxDate) {
  //     this.events.push(
  //       {
  //         start: aux,
  //         end: new Date(aux.getTime() + 15 * 60000),
  //         title: 'Med',
  //         color: colors.blue,
  //         actions: this.actions,
  //         resizable: {
  //           beforeStart: false,
  //           afterEnd: false,
  //         },
  //         draggable: false,
  //       },
  //     );
  //     aux = new Date(aux.getTime() + 15 * 60000);
  //   }
  }

  dayClicked(view: CalendarPeriod): void {
    // this.view = view;
    this.dateOrViewChanged();
  }

  // Horario clicado no calendar
  hourSegmentClicked(date: Date) {
    this.selectedDayViewDate = date;
    console.log(this.events);
    this.openModal();
    this.addSelectedDayViewClass();
  }

  beforeDayViewRender(dayView: DayViewHour[]) {
    this.dayView = dayView;
    this.addSelectedDayViewClass();
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

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
    });
    this.refresh.next();
  }
}
