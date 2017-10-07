/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PacientePesquisarCadastroComponent } from './paciente-pesquisar-cadastro.component';

describe('PacientePesquisarCadastroComponent', () => {
  let component: PacientePesquisarCadastroComponent;
  let fixture: ComponentFixture<PacientePesquisarCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PacientePesquisarCadastroComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientePesquisarCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
