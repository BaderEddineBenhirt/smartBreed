import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { INutrition } from '../nutrition.model';
import { NutritionService } from '../service/nutrition.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './nutrition-delete-dialog.component.html',
})
export class NutritionDeleteDialogComponent {
  nutrition?: INutrition;

  constructor(protected nutritionService: NutritionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.nutritionService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
