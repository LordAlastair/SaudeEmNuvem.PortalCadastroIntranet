import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../../_services/paciente.service';

@Component({
  templateUrl: './paciente-visualizar-cadastro.component.html',
  styleUrls: ['./paciente-visualizar-cadastro.component.scss'],
})

export class PacienteVisualizarCadastroComponent implements OnInit {
  paciente;
  mensagem;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pacienteService: PacienteService) { }

  ngOnInit() {
    this.pacienteService.buscarPorCodigo(this.route.snapshot.params['codigo']).then(paciente => {
      this.paciente = paciente;
    }, error => {
      if (error === 404) {
        this.mensagem = 'Registro do paciente não encontrado na base...';
      }
    });
  }
}
