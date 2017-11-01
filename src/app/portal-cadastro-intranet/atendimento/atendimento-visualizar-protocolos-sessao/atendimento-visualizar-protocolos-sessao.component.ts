import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AtendimentoService } from '../../_services/atendimento.service';
import { PacienteService } from '../../_services/paciente.service';

@Component({
    templateUrl: 'atendimento-visualizar-protocolos-sessao.component.html',
    styleUrls: ['atendimento-visualizar-protocolos-sessao.component.scss'],
})
export class AtendimentoVisualizarProtocolosSessaoComponent implements OnInit {
    atendimentoForm;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private atendimentoService: AtendimentoService,
        private pacienteService: PacienteService,
    ) { }

    ngOnInit() {
        this.atendimentoForm = this.atendimentoService.buscarPorProtocolo(this.route.snapshot.params['codigo']);
        const paciente = this.pacienteService.getById(this.atendimentoForm.paciente);
        this.atendimentoForm.paciente = paciente.nome;
    }
}
