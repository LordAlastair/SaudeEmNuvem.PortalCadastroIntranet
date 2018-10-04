/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PacienteVisualizarCadastroComponent } from './paciente-visualizar-cadastro.component';

describe('PacienteVisualizarCadastroComponent', () => {
  let component: PacienteVisualizarCadastroComponent;
  let fixture: ComponentFixture<PacienteVisualizarCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PacienteVisualizarCadastroComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteVisualizarCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
