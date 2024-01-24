import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MaladieComponent } from '../maladie/list/maladie.component';
import { AnimalDetailComponent } from './detail/animal-detail.component';
import { AnimalDeleteDialogComponent } from './delete/animal-delete-dialog.component';
import { AnimalRoutingModule } from './route/animal-routing.module';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MaladieService } from '../maladie/service/maladie.service';
import { ConditionsDeVieComponent } from '../conditions-de-vie/list/conditions-de-vie.component';
import { ConditionsDeVieUpdateComponent } from '../conditions-de-vie/update/conditions-de-vie-update.component';
import { GenetiqueComponent } from '../genetique/list/genetique.component';
import { NutritionComponent } from '../nutrition/list/nutrition.component';
import { SuiviComponent } from '../suivi/list/suivi.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  imports: [FontAwesomeModule,MatDialogModule,SharedModule, AnimalRoutingModule],
  declarations: [SuiviComponent,NutritionComponent,GenetiqueComponent, MaladieComponent, AnimalDetailComponent, AnimalDeleteDialogComponent, ConditionsDeVieComponent,ConditionsDeVieUpdateComponent],
  entryComponents: [AnimalDeleteDialogComponent],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    MaladieService
 ],
})
export class AnimalModule {}
