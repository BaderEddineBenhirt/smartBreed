import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
 
import { ConditionsDeVieDetailComponent } from './detail/conditions-de-vie-detail.component';
import { ConditionsDeVieDeleteDialogComponent } from './delete/conditions-de-vie-delete-dialog.component';
import { ConditionsDeVieRoutingModule } from './route/conditions-de-vie-routing.module';

@NgModule({
  imports: [SharedModule, ConditionsDeVieRoutingModule],
  declarations: [
   
    ConditionsDeVieDetailComponent,
    ConditionsDeVieDeleteDialogComponent,
  ],
})
export class ConditionsDeVieModule {}
