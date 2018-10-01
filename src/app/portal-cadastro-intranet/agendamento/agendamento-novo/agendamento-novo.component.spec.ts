/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AgendamentoNovoComponent } from './agendamento-novo.component';

describe('AgendamentoNovoComponent', () => {
  let component: AgendamentoNovoComponent;
  let fixture: ComponentFixture<AgendamentoNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AgendamentoNovoComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendamentoNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
