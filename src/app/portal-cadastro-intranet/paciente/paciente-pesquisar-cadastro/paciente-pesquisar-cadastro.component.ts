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
        type: 'string',
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
    },
  };

  public source: LocalDataSource;
  public pacientes: any[];

  constructor(private service: PacienteService, private router: Router) {
  }

  public ngOnInit() {
    this.service.buscarTodos().then(dados => {
      this.source = new LocalDataSource(dados.rows.map(function (row) {
        return row.doc;
      }));
    });
  }

  selecionarPaciente(event): void {
    this.router.navigate(['/portal-cadastro-intranet/paciente/visualizar', { codigo: event.data.codigo }]);
  }
}
