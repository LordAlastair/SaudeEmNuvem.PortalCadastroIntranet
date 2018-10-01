import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgendamentoNovoModalComponent } from '../agendamento-novo-modal/agendamento-novo-modal.component';


@Component({
  selector: 'ngx-agendamento-novo',
  templateUrl: './agendamento-novo.component.html',
  styleUrls: ['./agendamento-novo.component.scss'],
})
export class AgendamentoNovoComponent {

  constructor(private modalService: NgbModal) { }

  showLargeModal() {
    const activeModal = this.modalService.open(AgendamentoNovoModalComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'Large Modal';
  }
  showSmallModal() {
    const activeModal = this.modalService.open(AgendamentoNovoModalComponent, { size: 'sm', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'Small Modal';
  }

  showStaticModal() {
    const activeModal = this.modalService.open(AgendamentoNovoModalComponent, {
      size: 'sm',
      backdrop: 'static',
      container: 'nb-layout',
    });

    activeModal.componentInstance.modalHeader = 'Static modal';
    activeModal.componentInstance.modalContent = `This is static modal, backdrop click
                                                    will not close it. Click × or confirmation button to close modal.`;
  }

}
