import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { SanteDetailComponent } from './detail/sante-detail.component';
import { SanteUpdateComponent } from './update/sante-update.component';
import { SanteDeleteDialogComponent } from './delete/sante-delete-dialog.component';
import { SanteRoutingModule } from './route/sante-routing.module';

@NgModule({
  imports: [SharedModule, SanteRoutingModule],
  declarations: [ SanteDetailComponent, SanteUpdateComponent, SanteDeleteDialogComponent],
})
export class SanteModule {}
