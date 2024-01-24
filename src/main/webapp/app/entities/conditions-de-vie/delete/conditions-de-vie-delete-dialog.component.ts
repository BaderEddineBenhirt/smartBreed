import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IConditionsDeVie } from '../conditions-de-vie.model';
import { ConditionsDeVieService } from '../service/conditions-de-vie.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './conditions-de-vie-delete-dialog.component.html',
})
export class ConditionsDeVieDeleteDialogComponent {
  conditionsDeVie?: IConditionsDeVie;

  constructor(protected conditionsDeVieService: ConditionsDeVieService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.conditionsDeVieService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
