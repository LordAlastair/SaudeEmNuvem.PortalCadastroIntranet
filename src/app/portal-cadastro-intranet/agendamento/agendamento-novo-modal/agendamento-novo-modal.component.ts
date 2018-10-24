import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Paciente } from '../../_models/paciente';
import { PacienteDataService } from '../../_services/data-services/paciente-data.service';
import { AgendamentoDataService } from '../../_services/data-services/agendamento-data.service';
import { CriarConsulta } from '../../_models/commands/criarConsulta';
import { ToasterService, Toast } from 'angular2-toaster';
import {Observable} from 'rxjs';
import {debounceTime, map, distinctUntilChanged} from 'rxjs/operators';
import { Medico } from '../../_models/medico';

@Component({
  selector: 'ngx-modal',
  templateUrl: './agendamento-novo-modal.component.html',
  styleUrls: ['./agendamento-novo-modal.component.scss'],
})

export class AgendamentoNovoModalComponent implements OnInit {
  public modelPaciente: Paciente;
  public modelMedico: Medico;
  public modalHeader: string;
  public modalContent = ``;
  public medicos: any = [];
  public pacientes: any = [];
  horario: any;
  consultaCommand = {} as CriarConsulta;

  constructor(private activeModal: NgbActiveModal,
    private pacienteService: PacienteDataService,
    private agendamentoService: AgendamentoDataService,
    private toasterService: ToasterService) {
  }

  ngOnInit() {
    this.pacienteService.buscarTodos()
    .subscribe(response => {
      this.pacientes = response;
    });
    this.agendamentoService.buscarTodosMedicos()
    .subscribe(response => {
      this.medicos = response;
    });
  }

  closeModal() {

    this.activeModal.close();
  }

  marcar() {
    if (this.modelMedico && this.modelPaciente) {
      this.consultaCommand.horarioMarcado = this.horario;
      this.consultaCommand.medicoId = this.modelMedico.chaveNaturalCadApi;
      this.consultaCommand.medicoNome = this.modelMedico.nome;
      this.consultaCommand.pacienteChaveCadSus = this.modelPaciente.meta.chaveNaturalCadSus;
      this.consultaCommand.pacienteNome = this.modelPaciente.pessoa.nome;
      this.consultaCommand.tipoConsulta = 'exame';

      this.agendamentoService.criar(this.consultaCommand).subscribe(res => {
        if (res.idt) {
          this.logSuccess(' Agendamento registrado no sistema');
        }else {
          this.logError('Horário ocupado ou paciente já tem uma consulta marcada');
        }
      }, (error) => {
        this.logError(error.value);
      });
    } else {
      this.logError('Selecione o paciente e medico para a consulta');
    }
  }

  formatterPaciente = (x: {nome: string}) => x.nome ;
  formatterMedico = (x: {nome: string}) => x.nome ;

  searchPaciente = (text$: Observable<string>) =>
  text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
      : this.pacientes.filter(v => v.pessoa.nome.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)),
  );

  searchMedico = (text$: Observable<string>) =>
  text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
      : this.medicos.filter(v => v.nome.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)),
  );

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
}
