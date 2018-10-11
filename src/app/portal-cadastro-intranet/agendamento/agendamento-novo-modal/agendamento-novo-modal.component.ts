import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Paciente } from '../../_models/paciente';
import { PacienteDataService } from '../../_services/data-services/paciente-data.service';
import { AgendamentoDataService } from '../../_services/data-services/agendamento-data.service';
import { CriarConsulta } from '../../_models/commands/criarConsulta';
import { ToasterService, Toast } from 'angular2-toaster';

@Component({
  selector: 'ngx-modal',
  templateUrl: './agendamento-novo-modal.component.html',
})

export class AgendamentoNovoModalComponent implements OnInit {

  modalHeader: string;
  modalContent = ``;
  chave: string;
  medico: '9713c397-fedc-45e8-9e19-d1b9d52ba253';
  paciente: Paciente;
  pacientes: any = [];
  date: any;
  consultaCommand = {} as CriarConsulta;

  constructor(private activeModal: NgbActiveModal,
    private pacienteService: PacienteDataService,
    private AgendamentoService: AgendamentoDataService,
    private toasterService: ToasterService) {
    }

  ngOnInit() {
    this.pacienteService.buscarTodos()
      .subscribe(response => {
        this.pacientes = response;
      });
  }

  closeModal() {
    this.consultaCommand.horarioMarcado = this.date;
    this.consultaCommand.medicoId = '9713c397-fedc-45e8-9e19-d1b9d52ba253'
    this.consultaCommand.medicoNome = 'Medico Master';
    this.consultaCommand.pacienteChaveCadSus = this.paciente.meta.chaveNaturalCadSus;
    this.consultaCommand.pacienteNome = this.paciente.pessoa.nome;
    this.consultaCommand.tipoConsulta = 'exame';
    this.AgendamentoService.criar(this.consultaCommand).subscribe(res => {
      this.logSuccess(' Agendamento registrado no sistema');
    }, (error) => {
      this.logError(error.value);
    });
    this.activeModal.close();
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
}
