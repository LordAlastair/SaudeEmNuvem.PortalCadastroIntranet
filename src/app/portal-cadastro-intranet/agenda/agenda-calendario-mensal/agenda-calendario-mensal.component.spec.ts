import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaCalendarioMensalComponent } from './agenda-calendario-mensal.component';

describe('AgendaCalendarioMensalComponent', () => {
  let component: AgendaCalendarioMensalComponent;
  let fixture: ComponentFixture<AgendaCalendarioMensalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaCalendarioMensalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaCalendarioMensalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
