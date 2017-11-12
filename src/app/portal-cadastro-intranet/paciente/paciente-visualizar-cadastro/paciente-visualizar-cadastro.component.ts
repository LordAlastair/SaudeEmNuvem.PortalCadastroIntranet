import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteDataService } from '../../_services/data-services/paciente-data.service';

@Component({
  templateUrl: './paciente-visualizar-cadastro.component.html',
  styleUrls: ['./paciente-visualizar-cadastro.component.scss'],
})

export class PacienteVisualizarCadastroComponent implements OnInit {
  paciente;
  mensagem = 'Como você chegou aqui ?';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pacienteService: PacienteDataService) { }

  ngOnInit() {
    console.log(this.route.snapshot.params['codigo'] );
    if (this.route.snapshot.params['codigo'] !== undefined) {
      this.pacienteService.buscarPorCodigo(this.route.snapshot.params['codigo'])
        .subscribe(res => {
          this.paciente = res;
        }, (error) => {
          this.mensagem = error.value;
        },
      );
    }
    // this.paciente = this.pacienteService.buscarPorCodigo(this.route.snapshot.params['codigo']);
    // console.log(this.pacienteService.buscarPorCodigo(this.route.snapshot.params['codigo']));
  }
}
