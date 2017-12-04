import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaCalendarioHorariosDiaComponent } from './agenda-calendario-horarios-dia.component';

describe('AgendaCalendarioHorariosDiaComponent', () => {
  let component: AgendaCalendarioHorariosDiaComponent;
  let fixture: ComponentFixture<AgendaCalendarioHorariosDiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaCalendarioHorariosDiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaCalendarioHorariosDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
