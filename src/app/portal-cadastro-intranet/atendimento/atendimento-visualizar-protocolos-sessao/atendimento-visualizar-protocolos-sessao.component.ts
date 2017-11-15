import { AtendimentoDataService } from '../../_services/data-services/atendimento-data.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: 'atendimento-visualizar-protocolos-sessao.component.html',
  styleUrls: ['atendimento-visualizar-protocolos-sessao.component.scss'],
})
export class AtendimentoVisualizarProtocolosSessaoComponent implements OnInit {
  @Input() atendimento;
  @Input() mensagem: 'Algo deu errado...';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private atendimentoService: AtendimentoDataService,
  ) { }

  ngOnInit() {
    if (this.route.snapshot.params['codigo'] !== undefined) {
      this.carregarDados();
    }
  }

  carregarDados(): void {
    this.atendimentoService
      .buscarPorCodigo(this.route.snapshot.params['codigo'])
      .subscribe(
      res => {
        this.atendimento = res;
      },
      error => {
        this.mensagem = error.value;
      },
    );
  }

}
