import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FermeComponent } from './list/ferme.component';
import { FermeDetailComponent } from './detail/ferme-detail.component';
import { FermeUpdateComponent } from './update/ferme-update.component';
import { FermeDeleteDialogComponent } from './delete/ferme-delete-dialog.component';
import { FermeRoutingModule } from './route/ferme-routing.module';
import { AnimalUpdateComponent } from '../animal/update/animal-update.component';
import { AnimalComponent } from '../animal/list/animal.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { AnimalService } from '../animal/service/animal.service';
@NgModule({
  imports: [MatDialogModule,SharedModule, FermeRoutingModule],
  declarations: [AnimalUpdateComponent, AnimalComponent,FermeComponent, FermeDetailComponent, FermeUpdateComponent, FermeDeleteDialogComponent],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    AnimalService
 ],
})
export class FermeModule {}
