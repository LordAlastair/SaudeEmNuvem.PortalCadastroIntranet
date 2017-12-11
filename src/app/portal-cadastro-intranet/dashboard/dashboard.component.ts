import { Component } from '@angular/core';
import { CadastroService } from '../_services/cadastroService';
import { Paciente } from '../_models/paciente';
import { Agenda } from '../_models/agenda';
import { Medico } from '../_models/medico';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MedicoDataService } from '../_services/medico-data.service';
import { AgendaDataService } from '../_services/data-services/agenda-data.service';
import { Consulta } from '../_models/consulta';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  paciente: Paciente;
  agenda: Agenda;
  medico: Medico;
  medicos: Medico[];
  horarioSelecionado: boolean;
  pacienteSelecionado: boolean;
  consulta = {} as Consulta;



  constructor(private cadastroService: CadastroService,
    private medicoService: MedicoDataService,
    private agendaService: AgendaDataService) { }

  ngOnInit() {
    this.medicoService.buscarTodos().subscribe(
      data => {
        this.medicos = data;
      },
    );

    this.cadastroService.emitirPacienteSelecionado.subscribe(
      paciente => {
        this.paciente = paciente;
        this.pacienteSelecionado = true;
      },
    );

    this.cadastroService.emitirHorarioSelecionado.subscribe(
      agenda => {
        this.agenda = agenda;
        this.horarioSelecionado = true;
        const m = this.medicos.findIndex(x => x.idMedico === agenda.idMedico);
        this.medico = this.medicos[m];
      },
    );
    console.log(this.consulta);
    console.log(this.horarioSelecionado);
  }


  MarcarConsulta() {
    console.log(this.consulta);
    if (this.horarioSelecionado === true && this.pacienteSelecionado === true) {

      this.consulta.situacao = 'Marcado';
      this.consulta.idMedico = this.medico.idMedico;
      this. consulta.pacientecod = this.paciente.pacientecod;
      this. consulta.idAgenda = this.agenda.idAgenda;
      this. consulta.idTipoConsulta = this.medico.idEspecialidade;
      console.log(this.agenda);

      this.agendaService.mudarParaMarcado(this.agenda.idAgenda).subscribe();
      this.agendaService.criarConsulta(this.consulta).subscribe();

      console.log('pronto para cadastrar');
    }
  }

}
