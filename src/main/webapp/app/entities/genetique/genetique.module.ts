import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { GenetiqueDetailComponent } from './detail/genetique-detail.component';
import { GenetiqueUpdateComponent } from './update/genetique-update.component';
import { GenetiqueDeleteDialogComponent } from './delete/genetique-delete-dialog.component';
import { GenetiqueRoutingModule } from './route/genetique-routing.module';

@NgModule({
  imports: [SharedModule, GenetiqueRoutingModule],
  declarations: [ GenetiqueDetailComponent, GenetiqueUpdateComponent, GenetiqueDeleteDialogComponent],
})
export class GenetiqueModule {}
