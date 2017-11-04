import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';

import { PacienteService } from '../../_services/paciente.service';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: 'paciente-pesquisar-cadastro.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class PacientePesquisarCadastroComponent implements OnInit {
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
      apelido: {
        title: 'apelido',
        type: 'string',
      },
      nascimento: {
        title: 'Data Nascimento',
        type: 'Date',
      },
      cpf: {
        title: 'CPF',
        type: 'string',
      },
    },
  };

  public pacientes: Array<any>;
  public source: LocalDataSource;

  constructor(private service: PacienteService, private router: Router) {
    this.pacientes = [];
    this.source = new LocalDataSource();
  }

  public ngOnInit() {
    this.service.getAll();
    this.source.load(this.pacientes);
  }

  selecionarPaciente(event): void {
    this.router.navigate(['/portal-cadastro-intranet/paciente/visualizar', { codigo: event.data.codigo }]);
  }
}
