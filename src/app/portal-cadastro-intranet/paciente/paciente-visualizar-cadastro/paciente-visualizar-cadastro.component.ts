import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../../_services/paciente.service';

@Component({
  templateUrl: './paciente-visualizar-cadastro.component.html',
  styleUrls: ['./paciente-visualizar-cadastro.component.scss'],
})

export class PacienteVisualizarCadastroComponent implements OnInit {
  paciente;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pacienteService: PacienteService) { }

  ngOnInit() {
    this.paciente = this.pacienteService.getById(this.route.snapshot.params['codigo']);
  }
}
