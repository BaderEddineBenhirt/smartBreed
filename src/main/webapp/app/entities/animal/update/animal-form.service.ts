import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAnimal, NewAnimal } from '../animal.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAnimal for edit and NewAnimalFormGroupInput for create.
 */
type AnimalFormGroupInput = IAnimal | PartialWithRequiredKeyOf<NewAnimal>;

type AnimalFormDefaults = Pick<NewAnimal, 'id' | 'maladies'>;

type AnimalFormGroupContent = {
  id: FormControl<IAnimal['id'] | NewAnimal['id']>;
  ref: FormControl<IAnimal['ref']>;
  age: FormControl<IAnimal['age']>;
  genre: FormControl<IAnimal['genre']>;
  poids: FormControl<IAnimal['poids']>;
  refMere: FormControl<IAnimal['refMere']>;
  refPere: FormControl<IAnimal['refPere']>;
  type: FormControl<IAnimal['type']>;
  race: FormControl<IAnimal['race']>;
  genetique: FormControl<IAnimal['genetique']>;
  conditionsDeVie: FormControl<IAnimal['conditionsDeVie']>;
  maladies: FormControl<IAnimal['maladies']>;
  ferme: FormControl<IAnimal['ferme']>;
};

export type AnimalFormGroup = FormGroup<AnimalFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AnimalFormService {
  createAnimalFormGroup(animal: AnimalFormGroupInput = { id: null }): AnimalFormGroup {
    const animalRawValue = {
      ...this.getFormDefaults(),
      ...animal,
    };
    return new FormGroup<AnimalFormGroupContent>({
      id: new FormControl(
        { value: animalRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      ref: new FormControl(animalRawValue.ref),
      age: new FormControl(animalRawValue.age),
      genre: new FormControl(animalRawValue.genre),
      poids: new FormControl(animalRawValue.poids),
      refMere: new FormControl(animalRawValue.refMere),
      refPere: new FormControl(animalRawValue.refPere),
      type: new FormControl(animalRawValue.type),
      race: new FormControl(animalRawValue.race),
      genetique: new FormControl(animalRawValue.genetique),
      conditionsDeVie: new FormControl(animalRawValue.conditionsDeVie),
      maladies: new FormControl(animalRawValue.maladies ?? []),
      ferme: new FormControl(animalRawValue.ferme),
    });
  }

  getAnimal(form: AnimalFormGroup): IAnimal | NewAnimal {
    return form.getRawValue() as IAnimal | NewAnimal;
  }

  resetForm(form: AnimalFormGroup, animal: AnimalFormGroupInput): void {
    const animalRawValue = { ...this.getFormDefaults(), ...animal };
    form.reset(
      {
        ...animalRawValue,
        id: { value: animalRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AnimalFormDefaults {
    return {
      id: null,
      maladies: [],
    };
  }
}
