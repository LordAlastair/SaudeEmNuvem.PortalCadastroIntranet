import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Paciente } from '../../_models/paciente';
import { ToasterService, Toast } from 'angular2-toaster';
import { Router, ActivatedRoute } from '@angular/router';
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
    private pacienteService: PacienteService,
    private toasterService: ToasterService,
    private fb: FormBuilder,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) {
  }

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

      // this.router.navigate(['/portal-cadastro-intranet/atendimento/cadastro']);
      this.router.navigate(['/portal-cadastro-intranet/atendimento/cadastro', { codigo: codigo }]);
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

  // Validação CNS
  private validaCNS(vlrCNS: String) {
    if (vlrCNS === null || vlrCNS === '') {
      return false;
    }

    vlrCNS = vlrCNS.replace(/\s+/g, '');

    if ((vlrCNS.length) !== 15) {
      return false;
    }

    let soma: number;
    let resto: number;
    let dv: number;
    let pis: String;
    let resultado: String;

    pis = vlrCNS.substring(0, 11);
    soma = (((Number(pis.substring(0, 1))) * 15) +
      ((Number(pis.substring(1, 2))) * 14) +
      ((Number(pis.substring(2, 3))) * 13) +
      ((Number(pis.substring(3, 4))) * 12) +
      ((Number(pis.substring(4, 5))) * 11) +
      ((Number(pis.substring(5, 6))) * 10) +
      ((Number(pis.substring(6, 7))) * 9) +
      ((Number(pis.substring(7, 8))) * 8) +
      ((Number(pis.substring(8, 9))) * 7) +
      ((Number(pis.substring(9, 10))) * 6) +
      ((Number(pis.substring(10, 11))) * 5));

    resto = soma % 11;
    dv = 11 - resto;
    if (dv === 11) {
      dv = 0;
    }

    if (dv === 10) {
      soma = (((Number(pis.substring(0, 1))) * 15) +
        ((Number(pis.substring(1, 2))) * 14) +
        ((Number(pis.substring(2, 3))) * 13) +
        ((Number(pis.substring(3, 4))) * 12) +
        ((Number(pis.substring(4, 5))) * 11) +
        ((Number(pis.substring(5, 6))) * 10) +
        ((Number(pis.substring(6, 7))) * 9) +
        ((Number(pis.substring(7, 8))) * 8) +
        ((Number(pis.substring(8, 9))) * 7) +
        ((Number(pis.substring(9, 10))) * 6) +
        ((Number(pis.substring(10, 11))) * 5) + 2);
      resto = soma % 11;
      dv = 11 - resto;
      resultado = pis + '001' + String(dv);
    } else {
      resultado = pis + '000' + String(dv);
    }
    if (vlrCNS !== resultado) {
      return false;
    } else {
      return true;
    }
  }
}
