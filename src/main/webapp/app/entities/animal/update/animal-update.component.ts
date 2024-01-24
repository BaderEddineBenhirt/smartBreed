import { Component, Inject, OnInit, Optional } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { AnimalFormService, AnimalFormGroup } from './animal-form.service';
import { IAnimal } from '../animal.model';
import { AnimalService } from '../service/animal.service';
import { IGenetique } from 'app/entities/genetique/genetique.model';
import { GenetiqueService } from 'app/entities/genetique/service/genetique.service';
import { IConditionsDeVie } from 'app/entities/conditions-de-vie/conditions-de-vie.model';
import { ConditionsDeVieService } from 'app/entities/conditions-de-vie/service/conditions-de-vie.service';
import { IMaladie } from 'app/entities/maladie/maladie.model';
import { MaladieService } from 'app/entities/maladie/service/maladie.service';
import { IFerme } from 'app/entities/ferme/ferme.model';
import { FermeService } from 'app/entities/ferme/service/ferme.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'jhi-animal-update',
  templateUrl: './animal-update.component.html',
})
export class AnimalUpdateComponent implements OnInit {
  isSaving = false;
  animal: IAnimal | null = null;

  genetiquesCollection: IGenetique[] = [];
  conditionsDeViesSharedCollection: IConditionsDeVie[] = [];
  maladiesSharedCollection: IMaladie[] = [];
  fermesSharedCollection: IFerme[] = [];
  editable = true ;
  editForm: AnimalFormGroup = this.animalFormService.createAnimalFormGroup();

  constructor(
    protected animalService: AnimalService,
    protected animalFormService: AnimalFormService,
    protected genetiqueService: GenetiqueService,
    protected conditionsDeVieService: ConditionsDeVieService,
    protected maladieService: MaladieService,
    protected fermeService: FermeService,
    protected activatedRoute: ActivatedRoute,
    @Optional() public dialogRef: MatDialogRef<AnimalUpdateComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any |undefined  
  ) {}

  compareGenetique = (o1: IGenetique | null, o2: IGenetique | null): boolean => this.genetiqueService.compareGenetique(o1, o2);

  compareConditionsDeVie = (o1: IConditionsDeVie | null, o2: IConditionsDeVie | null): boolean =>
    this.conditionsDeVieService.compareConditionsDeVie(o1, o2);

  compareMaladie = (o1: IMaladie | null, o2: IMaladie | null): boolean => this.maladieService.compareMaladie(o1, o2);

  compareFerme = (o1: IFerme | null, o2: IFerme | null): boolean => this.fermeService.compareFerme(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ animal }) => {
      if(this.data === undefined || this.data === null){
        
        this.updateForm(animal);
       
      }
      else{
        this.editable = false ;
        this.setDefaultValue();
      } 

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  setDefaultValue():void{
    this.editForm.patchValue({
     
      ferme : this.data.e
    })
 
  }
  save(): void {
    this.isSaving = true;
    const animal = this.animalFormService.getAnimal(this.editForm);
    if (animal.id !== null ) {
      this.subscribeToSaveResponse(this.animalService.update(animal));
    } else {
      this.subscribeToSaveResponse(this.animalService.create(animal));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAnimal>>): void {
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

  protected updateForm(animal: IAnimal): void {
    this.animal = animal;
    this.animalFormService.resetForm(this.editForm, animal);

    this.genetiquesCollection = this.genetiqueService.addGenetiqueToCollectionIfMissing<IGenetique>(
      this.genetiquesCollection,
      animal.genetique
    );
    this.conditionsDeViesSharedCollection = this.conditionsDeVieService.addConditionsDeVieToCollectionIfMissing<IConditionsDeVie>(
      this.conditionsDeViesSharedCollection,
      animal.conditionsDeVie
    );
    this.maladiesSharedCollection = this.maladieService.addMaladieToCollectionIfMissing<IMaladie>(
      this.maladiesSharedCollection,
      ...(animal.maladies ?? [])
    );
    this.fermesSharedCollection = this.fermeService.addFermeToCollectionIfMissing<IFerme>(this.fermesSharedCollection, animal.ferme);
  }

  protected loadRelationshipsOptions(): void {
    this.genetiqueService
      .query()
      .pipe(map((res: HttpResponse<IGenetique[]>) => res.body ?? []))
      .pipe(
        map((genetiques: IGenetique[]) =>
          this.genetiqueService.addGenetiqueToCollectionIfMissing<IGenetique>(genetiques, this.animal?.genetique)
        )
      )
      .subscribe((genetiques: IGenetique[]) => (this.genetiquesCollection = genetiques));

    this.conditionsDeVieService
      .query()
      .pipe(map((res: HttpResponse<IConditionsDeVie[]>) => res.body ?? []))
      .pipe(
        map((conditionsDeVies: IConditionsDeVie[]) =>
          this.conditionsDeVieService.addConditionsDeVieToCollectionIfMissing<IConditionsDeVie>(
            conditionsDeVies,
            this.animal?.conditionsDeVie
          )
        )
      )
      .subscribe((conditionsDeVies: IConditionsDeVie[]) => (this.conditionsDeViesSharedCollection = conditionsDeVies));

    this.maladieService
      .query()
      .pipe(map((res: HttpResponse<IMaladie[]>) => res.body ?? []))
      .pipe(
        map((maladies: IMaladie[]) =>
          this.maladieService.addMaladieToCollectionIfMissing<IMaladie>(maladies, ...(this.animal?.maladies ?? []))
        )
      )
      .subscribe((maladies: IMaladie[]) => (this.maladiesSharedCollection = maladies));

    this.fermeService
      .query()
      .pipe(map((res: HttpResponse<IFerme[]>) => res.body ?? []))
      .pipe(map((fermes: IFerme[]) => this.fermeService.addFermeToCollectionIfMissing<IFerme>(fermes, this.animal?.ferme)))
      .subscribe((fermes: IFerme[]) => (this.fermesSharedCollection = fermes));
  }
}
