import { FormGroup, FormControl, FormArray, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'app/portal-cadastro-intranet/_services/paciente.service';
import { Paciente } from '../../_models/paciente';
import { ToasterModule, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-paciente-realizar-cadastro',
  templateUrl: './paciente-realizar-cadastro.component.html',
  styleUrls: ['./paciente-realizar-cadastro.component.scss'],
})
export class PacienteRealizarCadastroComponent implements OnInit {
  form: FormGroup;

  constructor(private pacienteService: PacienteService, private toasterService: ToasterService) { }
  ngOnInit() {
    this.form = new FormGroup({
      codigo: new FormControl(),
      nome: new FormControl(),
      cpf: new FormControl(),
      sobreNome: new FormControl(),
      cns: new FormControl(),
      nascimento: new FormControl(),
    });
  }

  register() {
    if (this.form.valid) {
      this.pacienteService.create(this.form.value);

      const toast: Toast = {
        type: 'success',
        body: this.form.value.nome + ' ' + this.form.value.sobreNome + ' ' + 'cadastrado com sucesso',
      };
      this.toasterService.pop(toast);
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
