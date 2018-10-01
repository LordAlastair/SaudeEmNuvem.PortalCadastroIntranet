import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-modal',
  templateUrl: './agendamento-novo-modal.component.html'
})
export class AgendamentoNovoModalComponent {

  modalHeader: string;
  modalContent = ``;

  constructor(private activeModal: NgbActiveModal) { }

  closeModal() {
    this.activeModal.close();
  }
}
