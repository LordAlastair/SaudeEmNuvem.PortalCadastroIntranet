import { AtendimentoDataService } from '../../_services/data-services/atendimento-data.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: 'atendimento-cadastro-paciente.component.html',
  styleUrls: ['atendimento-cadastro-paciente.component.scss'],
})

export class AtendimentoCadastroPacienteComponent implements OnInit {
  @Input() atendimento;
  @Input() mensagem: 'Algo deu errado...';

  atendimentoForm;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private atendimentoService: AtendimentoDataService) { }

  ngOnInit() {
    if (this.route.snapshot.params['codigo'] !== undefined) {
      this.carregarDados();
    }
  }

  carregarDados(): void {
    this.atendimentoService
      .gerarProtocoloPacienteRealizarCadastro(this.route.snapshot.params['codigo'])
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
