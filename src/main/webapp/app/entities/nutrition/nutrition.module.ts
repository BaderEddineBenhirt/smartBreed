import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { NutritionDetailComponent } from './detail/nutrition-detail.component';
import { NutritionUpdateComponent } from './update/nutrition-update.component';
import { NutritionDeleteDialogComponent } from './delete/nutrition-delete-dialog.component';
import { NutritionRoutingModule } from './route/nutrition-routing.module';

@NgModule({
  imports: [SharedModule, NutritionRoutingModule],
  declarations: [  NutritionDetailComponent, NutritionUpdateComponent, NutritionDeleteDialogComponent],
})
export class NutritionModule {}
