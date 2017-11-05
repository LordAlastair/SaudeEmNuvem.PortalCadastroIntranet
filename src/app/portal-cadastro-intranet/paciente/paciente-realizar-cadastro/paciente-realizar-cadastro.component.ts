import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToasterService } from 'angular2-toaster';

import { PacienteService } from '../../_services/paciente.service';

@Component({
  templateUrl: './paciente-realizar-cadastro.component.html',
  styleUrls: ['./paciente-realizar-cadastro.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PacienteRealizarCadastroComponent implements OnInit {
  form: FormGroup;

  public maskCpf = [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public maskCns =
  [/[0-9]/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
  public maskNascimento = [/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  constructor(
    private pacienteService: PacienteService, private toasterService: ToasterService,
    private fb: FormBuilder, private router: Router, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.form = this.fb.group({
      codigo: [],
      nome: [],
      cpf: [],
      sexo: [],
      apelido: [],
      cns: [],
      nascimento: [],
    });
  }

  register() {
    if (this.form.valid) {
      const codigo = this.pacienteService.cadastrarPaciente(this.form.value);
      const toast: Toast = {
        type: 'success',
        body: this.form.value.nome + ' ' + this.form.value.apelido + ' ' + 'cadastrado com sucesso',
      };
      this.toasterService.pop(toast);
      this.router.navigate(['/portal-cadastro-intranet/atendimento/pesquisar', { codigo: codigo }]);
    } else {
      const toast: Toast = {
        type: 'error',
        title: 'Formulário invalido',
        body: 'Termine de preencher os campos e ajuste os erros',
      };
      this.toasterService.pop(toast);
    }
  }

  cancelar() {
    this.router.navigate(['/portal-cadastro-intranet/dashboard']);
  }
}
