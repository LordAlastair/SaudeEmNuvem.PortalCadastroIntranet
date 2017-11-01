import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AtendimentoService } from '../../_services/atendimento.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
    templateUrl: 'atendimento-pesquisar-protocolo.component.html',
    styleUrls: ['atendimento-pesquisar-protocolo.component.scss'],
})

export class AtendimentoPesquisarProtocoloComponent {
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
          tipo: {
            title: 'Nome',
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

    source: LocalDataSource;

    constructor(private service: AtendimentoService, private router: Router) {
        this.source = new LocalDataSource();
        const data = this.service.listarTodosProtocolos();
        this.source.load(data);
    }

    selecionarProtocolo(event): void {
        this.router.navigate(['/portal-cadastro-intranet/atendimento/visualizarSessao', { codigo: event.data.codigo }]);
    }
}
