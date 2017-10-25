import { FormGroup, FormControl, FormArray, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'app/portal-cadastro-intranet/_services/paciente.service';
import { Paciente } from '../../_models/paciente';
import { ToasterModule, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

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
    this.pacienteService.create(this.form.value);

    const toast: Toast = {
      type: 'success',
      title: 'Here is a Toast Title',
      body: 'Here is a Toast Body',
    };
    this.toasterService.pop(toast);
  }
}
