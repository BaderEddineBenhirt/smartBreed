import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { MaladieFormService, MaladieFormGroup } from './maladie-form.service';
import { IMaladie } from '../maladie.model';
import { MaladieService } from '../service/maladie.service';

@Component({
  selector: 'jhi-maladie-update',
  templateUrl: './maladie-update.component.html',
})
export class MaladieUpdateComponent implements OnInit {
  isSaving = false;
  maladie: IMaladie | null = null;

  editForm: MaladieFormGroup = this.maladieFormService.createMaladieFormGroup();

  constructor(
    protected maladieService: MaladieService,
    protected maladieFormService: MaladieFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ maladie }) => {
      this.maladie = maladie;
      if (maladie) {
        this.updateForm(maladie);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const maladie = this.maladieFormService.getMaladie(this.editForm);
    if (maladie.id !== null) {
      this.subscribeToSaveResponse(this.maladieService.update(maladie));
    } else {
      this.subscribeToSaveResponse(this.maladieService.create(maladie));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMaladie>>): void {
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

  protected updateForm(maladie: IMaladie): void {
    this.maladie = maladie;
    this.maladieFormService.resetForm(this.editForm, maladie);
  }
}
