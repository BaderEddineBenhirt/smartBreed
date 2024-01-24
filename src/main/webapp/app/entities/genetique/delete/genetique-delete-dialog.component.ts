import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IGenetique } from '../genetique.model';
import { GenetiqueService } from '../service/genetique.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './genetique-delete-dialog.component.html',
})
export class GenetiqueDeleteDialogComponent {
  genetique?: IGenetique;

  constructor(protected genetiqueService: GenetiqueService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.genetiqueService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
