import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { SuiviFormService, SuiviFormGroup } from './suivi-form.service';
import { ISuivi } from '../suivi.model';
import { SuiviService } from '../service/suivi.service';
import { IAnimal } from 'app/entities/animal/animal.model';
import { AnimalService } from 'app/entities/animal/service/animal.service';

@Component({
  selector: 'jhi-suivi-update',
  templateUrl: './suivi-update.component.html',
})
export class SuiviUpdateComponent implements OnInit {
  isSaving = false;
  suivi: ISuivi | null = null;

  animalsSharedCollection: IAnimal[] = [];

  editForm: SuiviFormGroup = this.suiviFormService.createSuiviFormGroup();

  constructor(
    protected suiviService: SuiviService,
    protected suiviFormService: SuiviFormService,
    protected animalService: AnimalService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareAnimal = (o1: IAnimal | null, o2: IAnimal | null): boolean => this.animalService.compareAnimal(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ suivi }) => {
      this.suivi = suivi;
      if (suivi) {
        this.updateForm(suivi);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const suivi = this.suiviFormService.getSuivi(this.editForm);
    if (suivi.id !== null) {
      this.subscribeToSaveResponse(this.suiviService.update(suivi));
    } else {
      this.subscribeToSaveResponse(this.suiviService.create(suivi));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISuivi>>): void {
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

  protected updateForm(suivi: ISuivi): void {
    this.suivi = suivi;
    this.suiviFormService.resetForm(this.editForm, suivi);

    this.animalsSharedCollection = this.animalService.addAnimalToCollectionIfMissing<IAnimal>(this.animalsSharedCollection, suivi.animal);
  }

  protected loadRelationshipsOptions(): void {
    this.animalService
      .query()
      .pipe(map((res: HttpResponse<IAnimal[]>) => res.body ?? []))
      .pipe(map((animals: IAnimal[]) => this.animalService.addAnimalToCollectionIfMissing<IAnimal>(animals, this.suivi?.animal)))
      .subscribe((animals: IAnimal[]) => (this.animalsSharedCollection = animals));
  }
}
