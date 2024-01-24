import { Component, Inject, OnInit, Optional } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ConditionsDeVieFormService, ConditionsDeVieFormGroup } from './conditions-de-vie-form.service';
import { IConditionsDeVie } from '../conditions-de-vie.model';
import { ConditionsDeVieService } from '../service/conditions-de-vie.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'jhi-conditions-de-vie-update',
  templateUrl: './conditions-de-vie-update.component.html',
})
export class ConditionsDeVieUpdateComponent implements OnInit {
  isSaving = false;
  conditionsDeVie: IConditionsDeVie | null = null;

  editForm: ConditionsDeVieFormGroup = this.conditionsDeVieFormService.createConditionsDeVieFormGroup();

  constructor(
    protected conditionsDeVieService: ConditionsDeVieService,
    protected conditionsDeVieFormService: ConditionsDeVieFormService,
    protected activatedRoute: ActivatedRoute,
     
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ conditionsDeVie }) => {
      this.conditionsDeVie = conditionsDeVie;
      if (conditionsDeVie) {
        this.updateForm(conditionsDeVie);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }
 
   
 
  save(): void {
    this.isSaving = true;
    const conditionsDeVie = this.conditionsDeVieFormService.getConditionsDeVie(this.editForm);
    if (conditionsDeVie.id !== null) {
      this.subscribeToSaveResponse(this.conditionsDeVieService.update(conditionsDeVie));
    } else {
      this.subscribeToSaveResponse(this.conditionsDeVieService.create(conditionsDeVie));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConditionsDeVie>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }
 

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(conditionsDeVie: IConditionsDeVie): void {
    this.conditionsDeVie = conditionsDeVie;
    this.conditionsDeVieFormService.resetForm(this.editForm, conditionsDeVie);
  }
}
