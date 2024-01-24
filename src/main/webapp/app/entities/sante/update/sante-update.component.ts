import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { SanteFormService, SanteFormGroup } from './sante-form.service';
import { ISante } from '../sante.model';
import { SanteService } from '../service/sante.service';
import { IMaladie } from 'app/entities/maladie/maladie.model';
import { MaladieService } from 'app/entities/maladie/service/maladie.service';

@Component({
  selector: 'jhi-sante-update',
  templateUrl: './sante-update.component.html',
})
export class SanteUpdateComponent implements OnInit {
  isSaving = false;
  sante: ISante | null = null;

  maladiesSharedCollection: IMaladie[] = [];

  editForm: SanteFormGroup = this.santeFormService.createSanteFormGroup();

  constructor(
    protected santeService: SanteService,
    protected santeFormService: SanteFormService,
    protected maladieService: MaladieService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareMaladie = (o1: IMaladie | null, o2: IMaladie | null): boolean => this.maladieService.compareMaladie(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sante }) => {
      this.sante = sante;
      if (sante) {
        this.updateForm(sante);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sante = this.santeFormService.getSante(this.editForm);
    if (sante.id !== null) {
      this.subscribeToSaveResponse(this.santeService.update(sante));
    } else {
      this.subscribeToSaveResponse(this.santeService.create(sante));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISante>>): void {
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

  protected updateForm(sante: ISante): void {
    this.sante = sante;
    this.santeFormService.resetForm(this.editForm, sante);

    this.maladiesSharedCollection = this.maladieService.addMaladieToCollectionIfMissing<IMaladie>(
      this.maladiesSharedCollection,
      sante.maladie
    );
  }

  protected loadRelationshipsOptions(): void {
    this.maladieService
      .query()
      .pipe(map((res: HttpResponse<IMaladie[]>) => res.body ?? []))
      .pipe(map((maladies: IMaladie[]) => this.maladieService.addMaladieToCollectionIfMissing<IMaladie>(maladies, this.sante?.maladie)))
      .subscribe((maladies: IMaladie[]) => (this.maladiesSharedCollection = maladies));
  }
}
