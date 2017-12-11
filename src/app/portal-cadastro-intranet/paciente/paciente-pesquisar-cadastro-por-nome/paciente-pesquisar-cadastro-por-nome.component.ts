import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';

import { PacienteDataService } from '../../_services/data-services/paciente-data.service';
import { CadastroService } from '../../_services/cadastroService';

@Component({
  selector: 'ngx-pesquisar-paciente-por-nome',
  templateUrl: 'paciente-pesquisar-cadastro-por-nome.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})

export class PacientePesquisarCadastroPorNomeComponent implements OnInit {
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    pager: {
      display: true,
      perPage: 5,
    },
    columns: {
      chaveNatural: {
        title: 'Codigo',
        type: 'string',
      },
      nome: {
        title: 'Nome',
        type: 'string',
      },
      nomeApelido: {
        title: 'apelido',
        type: 'string',
      },
      dataNascimento: {
        title: 'Data Nascimento',
        type: 'Date',
      },
    },
  };

  public source: LocalDataSource;

  constructor(
    private cd: ChangeDetectorRef,
    private http: HttpClient,
    private pacienteService: PacienteDataService,
    private router: Router,
    private cadastroService: CadastroService) { }

  public ngOnInit() {
    this.source = new LocalDataSource();
    this.carregarDados();
  }

  carregarDados(): void {
    this.pacienteService.buscarTodos()
      .subscribe(pacientes => this.source.load(pacientes));
  }

  selecionarPaciente(event): void {
     this.cadastroService.pacienteSelecionado(event.data);
  }
}
