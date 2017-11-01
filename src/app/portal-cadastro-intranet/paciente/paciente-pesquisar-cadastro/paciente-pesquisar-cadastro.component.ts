import { Http } from '@angular/http';
import { Component, Output } from '@angular/core';
import { PacienteService } from '../../_services/paciente.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';

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

  source: LocalDataSource;

  constructor(private service: PacienteService, private router: Router) {
    this.source = new LocalDataSource();
    const data = this.service.getAll();
    this.source.load(data);
  }

  selecionarPaciente(event): void {
    this.router.navigate(['/portal-cadastro-intranet/paciente/visualizar', { codigo: event.data.codigo}]);
  }
}
