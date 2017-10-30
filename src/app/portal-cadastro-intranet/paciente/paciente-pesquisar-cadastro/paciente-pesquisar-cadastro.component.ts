import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { PacienteService } from '../../_services/paciente.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: 'paciente-pesquisar-cadastro.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class PacientePesquisarCadastroComponent {
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      codigo: {
        title: 'Codigo',
        type: 'number',
      },
      nome: {
        title: 'Nome',
        type: 'string',
      },
      Apelido: {
        title: 'apelido',
        type: 'string',
      },
      nascimento: {
        title: 'Data Nascimento',
        type: 'Date',
      },
      cns: {
        title: 'CNS',
        type: 'string',
      },
      cpf: {
        title: 'CPF',
        type: 'string',
      },
    },
  };

  source: LocalDataSource;

  constructor(private service: PacienteService) {
    this.source = new LocalDataSource();
    const data = this.service.getAll();
    this.source.load(data)
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
