import { Component, EventEmitter, Input, Output, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { colors } from '../../_util/calendar/colors';
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
} from 'date-fns';
import { CadastroService } from '../../_services/cadastroService';
import { AgendaDataService } from '../../_services/data-services/agenda-data.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

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

@Component({
  selector: 'ngx-calendario-mensal',
  templateUrl: './agenda-calendario-mensal.component.html',
  styleUrls: ['./agenda-calendario-mensal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AgendaCalendarioMensalComponent implements OnInit {
  @Input() view: CalendarPeriod = 'month';
  @Input() locale = 'pt-br';

  @Input() events: CalendarEvent[] = [];

  @Input() viewDate: Date = new Date();
  @Input() minDate: Date = subMonths(new Date(), 0);
  @Input() maxDate: Date = addMonths(new Date(), 1);

  @Input() prevBtnDisabled: boolean;
  @Input() nextBtnDisabled: boolean;

  @Input() selectedMonthViewDay: CalendarMonthViewDay;
  private vagasDias: number[] = [];
  constructor(private service: CadastroService, private agendaService: AgendaDataService) {
    this.dateOrViewChanged();
  }

  ngOnInit() {
    const date = new Date();
    const dias = this.diasNoMes(date.getMonth(), date.getFullYear());
    this.carregarvagasDias(dias);
  }

  diaDoMesSelecionado(day: CalendarMonthViewDay): void {
    if (this.selectedMonthViewDay) {
      delete this.selectedMonthViewDay.cssClass;
      this.aplicarCorDia(day);
    }
    day.cssClass = 'cal-day-selected';
    this.selectedMonthViewDay = day;
    this.service.diaSelecionado(day.date);
  }

  carregarvagasDias(dias: Date[]) {
    for (let i = 0; i < dias.length; i++) {
      this.agendaService.temConsultasAbertasDia(dias[i]).subscribe(res => {
        this.vagasDias.push(res);
      });
    }
  }

  diasNoMes(mes, ano) {
    const date = new Date(ano, mes, 1);
    const dias = [];
    while (date.getMonth() === mes) {
      dias.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dias;
  }

  aplicarCorDia(day: CalendarMonthViewDay) {
    // delete day.cssClass;
    // if (this.vagasDias[day.date.getDay()] > 0) {
    //   day.cssClass = 'tem-vagas';
    // } else {
    //   day.cssClass = 'sem-vagas';
    // }
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      if (day.isFuture) {
        this.aplicarCorDia(day);
      }
    });
  }

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

  changeView(view: CalendarPeriod): void {
    this.view = view;
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
}
