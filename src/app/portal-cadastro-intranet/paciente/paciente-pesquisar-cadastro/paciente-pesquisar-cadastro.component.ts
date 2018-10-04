import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { DatePipe } from '@angular/common';
import { PacienteDataService } from '../../_services/data-services/paciente-data.service';

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

  constructor(
    private cd: ChangeDetectorRef,
    private http: HttpClient,
    private pacienteService: PacienteDataService,
    private router: Router) { }

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
        // pacientes.forEach(element => {
        //   teste.push(
        //     {
        //       nome: element.pessoa.nome,
        //       apelido: element.pessoa.apelido,
        //       dataNascimento: element.pessoa.dataNascimento,
        //       chave: element.meta.chaveNaturalCadSus,
        //     });
        // });
      });
  }

  selecionarPaciente(event): void {
    this.router.navigate(['/portal-cadastro-intranet/paciente/visualizar', { codigo: event.data.chave }]);
  }
}
