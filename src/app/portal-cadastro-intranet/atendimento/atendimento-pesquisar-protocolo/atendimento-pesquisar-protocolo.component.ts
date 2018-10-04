import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AtendimentoDataService } from '../../_services/data-services/atendimento-data.service';

@Component({
  templateUrl: 'atendimento-pesquisar-protocolo.component.html',
  styleUrls: ['atendimento-pesquisar-protocolo.component.scss'],
})

export class AtendimentoPesquisarProtocoloComponent implements OnInit {
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      chaveNatural: {
        title: 'Codigo Atendimento',
        type: 'string',
      },
      tipo: {
        title: 'Tipo',
        type: 'string',
      },
      atendente: {
        title: 'Atendente',
        type: 'string',
      },
      data: {
        title: 'Data Nascimento',
        type: 'Date',
      },
      paciente: {
        title: 'codigo Paciente',
        type: 'string',
      },
    },
  };

  @Input() source: LocalDataSource;
  @Input() mensagem: 'Algo deu errado...';

  constructor(private service: AtendimentoDataService, private router: Router) { }

  ngOnInit() {
    this.source = new LocalDataSource();
    this.carregarDados();
  }

  carregarDados(): void {
    this.service.buscarTodos()
      .subscribe(pacientes => this.source.load(pacientes));
  }

  selecionarProtocolo(event): void {
    this.router.navigate(['/portal-cadastro-intranet/atendimento/visualizarSessao', { codigo: event.data.idAtendimento }]);
  }
}
