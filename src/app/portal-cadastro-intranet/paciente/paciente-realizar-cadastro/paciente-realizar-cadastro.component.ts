import { FormGroup, FormControl, FormArray, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'app/portal-cadastro-intranet/_services/paciente.service';
import { Paciente } from '../../_models/paciente';

@Component({
  selector: 'ngx-paciente-realizar-cadastro',
  templateUrl: './paciente-realizar-cadastro.component.html',
  styleUrls: ['./paciente-realizar-cadastro.component.scss'],
})
export class PacienteRealizarCadastroComponent implements OnInit {
  form: FormGroup;

  constructor(private pacienteService: PacienteService) { }
  ngOnInit() {
    this.form = new FormGroup({
      nome: new FormControl(),
      cpf: new FormControl(),
      sobreNome: new FormControl(),
      cns: new FormControl(),
      nascimento: new FormControl(),
    });
  }

  register() {
    let pacientes: any[] = JSON.parse(localStorage.getItem("pacientes") || '[]');
    console.log(pacientes);
    pacientes.push(this.form.value);
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
  }
}
