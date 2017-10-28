import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'app/portal-cadastro-intranet/_services/paciente.service';
import { Paciente } from '../../_models/paciente';
import { ToasterService, Toast } from 'angular2-toaster';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-paciente-realizar-cadastro',
  templateUrl: './paciente-realizar-cadastro.component.html',
  styleUrls: ['./paciente-realizar-cadastro.component.scss'],
})

export class PacienteRealizarCadastroComponent implements OnInit {
  form: FormGroup;
  public mask = [/[1-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  constructor(
    private pacienteService: PacienteService,
    private toasterService: ToasterService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      codigo: [],
      nome: [],
      cpf: [],
      sobreNome: [],
      cns: [],
      nascimento: [],
    });
  }

  register() {
    if (this.form.valid) {
      const ngbDate = this.form.controls.nascimento.value;
      const paciente: Paciente = this.form.value;
      paciente.nascimento = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);

      this.pacienteService.create(paciente);

      const toast: Toast = {
        type: 'success',
        body: this.form.value.nome + ' ' + this.form.value.sobreNome + ' ' + 'cadastrado com sucesso',
      };
      this.toasterService.pop(toast);
      this.router.navigate(['/portal-cadastro-intranet/paciente/visualizar']);
    } else {
      const toast: Toast = {
        type: 'error',
        title: 'Formulário invalido',
        body: 'Termine de preencher os campos e ajuste os erros',
      };
      this.toasterService.pop(toast);
    }
  }
}
