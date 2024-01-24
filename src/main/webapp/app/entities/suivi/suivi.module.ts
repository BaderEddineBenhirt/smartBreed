import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { SuiviDetailComponent } from './detail/suivi-detail.component';
import { SuiviUpdateComponent } from './update/suivi-update.component';
import { SuiviDeleteDialogComponent } from './delete/suivi-delete-dialog.component';
import { SuiviRoutingModule } from './route/suivi-routing.module';

@NgModule({
  imports: [SharedModule, SuiviRoutingModule],
  declarations: [ SuiviDetailComponent, SuiviUpdateComponent, SuiviDeleteDialogComponent],
})
export class SuiviModule {}
