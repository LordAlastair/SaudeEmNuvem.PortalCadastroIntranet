import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToasterService } from 'angular2-toaster';
import { PacienteDataService } from '../../_services/data-services/paciente-data.service';

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
    private pacienteService: PacienteDataService, private toasterService: ToasterService,
    private fb: FormBuilder, private router: Router, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.form = this.fb.group({
      nome: [],
      apelido: [],
      nomeMae: [],
      nomePai: [],
      dataNascimento: [],
      cpf: [],
      rg: [],
      cns: [],
      pais: [],
      cor: 1,
      sexo: 1,
      tipoSanguineo: 1,
      nacionalidade: 1,
      meta: {
        chaveNaturalCadSus: this.gerarChave(),
      },
    });
  }

  register() {
    if (this.form.valid) {
      this.pacienteService.criar(this.form.value).subscribe(res => {
        this.logSuccess(this.form.value.nome + ' cadastrado no sistema');
        this.router.navigate(
          ['/portal-cadastro-intranet/atendimento/cadastro', { codigo: this.form.value.meta.chaveNaturalCadSus }]);
      }, (error) => {
        this.logSuccess(error.value);
      });
    }
  }

  private cancelar() {
    this.router.navigate(['/portal-cadastro-intranet/dashboard']);
  }

  private logError(msg: string) {
    const toast: Toast = {
      type: 'error',
      body: msg,
    };
    this.toasterService.pop(toast);
  }

  private logSuccess(msg: string) {
    const toast: Toast = {
      type: 'success',
      body: msg,
    };
    this.toasterService.pop(toast);
  }

  private gerarChave() {
    const date = new Date();
    return date.getMilliseconds() + '' +
      date.getHours() + this.diaMes(date) + this.mesComZero(date) + date.getFullYear();
  }

  private diaMes(d) {
    return (d.getDate() < 10 ? '0' : '') + d.getDate();
  }

  private mesComZero(d) {
    return ('0' + (d.getMonth() + 1)).slice(-2);
  }
}
