import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMendel } from '../mendel.model';
import { MendelService } from '../service/mendel.service';

@Component({
  templateUrl: './mendel-delete-dialog.component.html',
})
export class MendelDeleteDialogComponent {
  maladie?: IMendel;

  constructor(protected maladieService: MendelService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.maladieService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
