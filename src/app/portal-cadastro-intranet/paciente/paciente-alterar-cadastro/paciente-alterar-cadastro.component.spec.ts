/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PacienteAlterarCadastroComponent } from './paciente-alterar-cadastro.component';

describe('PacienteAlterarCadastroComponent', () => {
  let component: PacienteAlterarCadastroComponent;
  let fixture: ComponentFixture<PacienteAlterarCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PacienteAlterarCadastroComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteAlterarCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
