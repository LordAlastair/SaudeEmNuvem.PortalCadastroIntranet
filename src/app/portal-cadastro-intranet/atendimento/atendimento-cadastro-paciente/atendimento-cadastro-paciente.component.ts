import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AtendimentoService } from '/services/atendimento.service';

@Component({
    templateUrl: 'atendimento-cadastro-paciente.component.html',
    styleUrls: ['atendimento-cadastro-paciente.component.scss'],
})
export class AtendimentoCadastroPacienteComponent implements OnInit {
    atendimentoForm;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private atendimentoService: AtendimentoService) { }

    ngOnInit() {
        this.atendimentoForm =  this.atendimentoService.gerarProtocoloPacienteRealizarCadastro(this.route.snapshot.params['codigo']);
    }
}
