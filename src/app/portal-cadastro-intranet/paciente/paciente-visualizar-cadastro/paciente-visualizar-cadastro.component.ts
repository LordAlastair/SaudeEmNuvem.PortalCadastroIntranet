import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteDataService } from '../../_services/data-services/paciente-data.service';

@Component({
  templateUrl: './paciente-visualizar-cadastro.component.html',
  styleUrls: ['./paciente-visualizar-cadastro.component.scss'],
})
export class PacienteVisualizarCadastroComponent implements OnInit {
  @Input() paciente;

  mensagem = 'Como você chegou aqui ?';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pacienteService: PacienteDataService,
  ) { }

  ngOnInit() {
    if (this.route.snapshot.params['codigo'] !== undefined) {
      this.paciente = this.pacienteService
        .buscarPorCodigo(this.route.snapshot.params['codigo'])
        .subscribe(
        res => {
          this.paciente = res;
        },
        error => {
          this.mensagem = error.value;
        },
      );
    }
  }
}
