import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { NutritionFormService, NutritionFormGroup } from './nutrition-form.service';
import { INutrition } from '../nutrition.model';
import { NutritionService } from '../service/nutrition.service';
import { IAnimal } from 'app/entities/animal/animal.model';
import { AnimalService } from 'app/entities/animal/service/animal.service';

@Component({
  selector: 'jhi-nutrition-update',
  templateUrl: './nutrition-update.component.html',
})
export class NutritionUpdateComponent implements OnInit {
  isSaving = false;
  nutrition: INutrition | null = null;

  animalsSharedCollection: IAnimal[] = [];

  editForm: NutritionFormGroup = this.nutritionFormService.createNutritionFormGroup();

  constructor(
    protected nutritionService: NutritionService,
    protected nutritionFormService: NutritionFormService,
    protected animalService: AnimalService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareAnimal = (o1: IAnimal | null, o2: IAnimal | null): boolean => this.animalService.compareAnimal(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ nutrition }) => {
      this.nutrition = nutrition;
      if (nutrition) {
        this.updateForm(nutrition);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const nutrition = this.nutritionFormService.getNutrition(this.editForm);
    if (nutrition.id !== null) {
      this.subscribeToSaveResponse(this.nutritionService.update(nutrition));
    } else {
      this.subscribeToSaveResponse(this.nutritionService.create(nutrition));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INutrition>>): void {
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

  protected updateForm(nutrition: INutrition): void {
    this.nutrition = nutrition;
    this.nutritionFormService.resetForm(this.editForm, nutrition);

    this.animalsSharedCollection = this.animalService.addAnimalToCollectionIfMissing<IAnimal>(
      this.animalsSharedCollection,
      nutrition.animal
    );
  }

  protected loadRelationshipsOptions(): void {
    this.animalService
      .query()
      .pipe(map((res: HttpResponse<IAnimal[]>) => res.body ?? []))
      .pipe(map((animals: IAnimal[]) => this.animalService.addAnimalToCollectionIfMissing<IAnimal>(animals, this.nutrition?.animal)))
      .subscribe((animals: IAnimal[]) => (this.animalsSharedCollection = animals));
  }
}
