import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MendelComponent } from './list/mendel.component';
import { MendelDetailComponent } from './detail/mendel-detail.component';

import { MendelDeleteDialogComponent } from './delete/mendel-delete-dialog.component';
import { MendelRoutingModule } from './route/mendel-routing.module';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [SharedModule, MendelRoutingModule, MatSliderModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  declarations: [MendelComponent, MendelDetailComponent, MendelDeleteDialogComponent],
  entryComponents: [MendelDeleteDialogComponent],
})
export class MendelModule {}
