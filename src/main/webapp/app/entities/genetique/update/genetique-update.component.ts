import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { GenetiqueFormService, GenetiqueFormGroup } from './genetique-form.service';
import { IGenetique } from '../genetique.model';
import { GenetiqueService } from '../service/genetique.service';

@Component({
  selector: 'jhi-genetique-update',
  templateUrl: './genetique-update.component.html',
})
export class GenetiqueUpdateComponent implements OnInit {
  isSaving = false;
  genetique: IGenetique | null = null;

  editForm: GenetiqueFormGroup = this.genetiqueFormService.createGenetiqueFormGroup();

  constructor(
    protected genetiqueService: GenetiqueService,
    protected genetiqueFormService: GenetiqueFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ genetique }) => {
      this.genetique = genetique;
      if (genetique) {
        this.updateForm(genetique);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const genetique = this.genetiqueFormService.getGenetique(this.editForm);
    if (genetique.id !== null) {
      this.subscribeToSaveResponse(this.genetiqueService.update(genetique));
    } else {
      this.subscribeToSaveResponse(this.genetiqueService.create(genetique));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGenetique>>): void {
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

  protected updateForm(genetique: IGenetique): void {
    this.genetique = genetique;
    this.genetiqueFormService.resetForm(this.editForm, genetique);
  }
}
