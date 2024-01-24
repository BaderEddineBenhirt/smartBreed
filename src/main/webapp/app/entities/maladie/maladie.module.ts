import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MaladieDetailComponent } from './detail/maladie-detail.component';
import { MaladieUpdateComponent } from './update/maladie-update.component';
import { MaladieDeleteDialogComponent } from './delete/maladie-delete-dialog.component';
import { MaladieRoutingModule } from './route/maladie-routing.module';
import { SanteComponent } from '../sante/list/sante.component';
@NgModule({
  imports: [SharedModule, MaladieRoutingModule],
  declarations: [SanteComponent, MaladieDetailComponent, MaladieUpdateComponent, MaladieDeleteDialogComponent],
})
export class MaladieModule {}
