import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgendamentoNovoModalComponent } from '../agendamento-novo-modal/agendamento-novo-modal.component';
import { LocalDataSource } from 'ng2-smart-table';
import { PacienteDataService } from '../../_services/data-services/paciente-data.service';

@Component({
  selector: 'ngx-agendamento-novo',
  templateUrl: './agendamento-novo.component.html',
  styleUrls: ['./agendamento-novo.component.scss'],
})

export class AgendamentoNovoComponent implements OnInit {
  // Table
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      chave: {
        title: 'Codigo',
        type: 'string',
      },
      nome: {
        title: 'Nome',
        type: 'string',
      },
      apelido: {
        title: 'Apelido',
        type: 'string',
      },
      dataNascimento: {
        title: 'Data Nascimento',
        type: 'date',
        valuePrepareFunction: (dataNascimento) => {
          const raw = new Date(dataNascimento);
          return raw.toLocaleDateString('en-Us');

        },
      },
    },
  };


  public source: LocalDataSource;

  // Modal

  constructor(private modalService: NgbModal,
    private pacienteService: PacienteDataService) { }

  public ngOnInit() {
    this.source = new LocalDataSource();
    this.carregarDados();
  }

  carregarDados(): void {
    this.pacienteService.buscarTodos()
      .subscribe(pacientes => {
        const teste = pacientes.map(p => {
          return {
            nome: p.pessoa.nome,
            apelido: p.pessoa.apelido,
            dataNascimento: p.pessoa.dataNascimento,
            chave: p.meta.chaveNaturalCadSus,
          }
        })
        this.source.load(teste);
      });
  }

  selecionarPaciente(event): void {
    const activeModal =
      this.modalService.open(AgendamentoNovoModalComponent, { size: 'lg', container: 'nb-layout' });
console.log(event.data.chave);
    activeModal.componentInstance.modalHeader = 'Marcar Consulta';
    activeModal.componentInstance.chave = event.data.chave;
  }

  showLargeModal(chave) {
    const activeModal =
      this.modalService.open(AgendamentoNovoModalComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'Marcar Consulta';
    activeModal.componentInstance.chave = chave;
  }
}
