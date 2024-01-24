import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IMaladie, NewMaladie } from '../maladie.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMaladie for edit and NewMaladieFormGroupInput for create.
 */
type MaladieFormGroupInput = IMaladie | PartialWithRequiredKeyOf<NewMaladie>;

type MaladieFormDefaults = Pick<NewMaladie, 'id' | 'animals'>;

type MaladieFormGroupContent = {
  id: FormControl<IMaladie['id'] | NewMaladie['id']>;
  nomMaladie: FormControl<IMaladie['nomMaladie']>;
  symptomes: FormControl<IMaladie['symptomes']>;
  animals: FormControl<IMaladie['animals']>;
};

export type MaladieFormGroup = FormGroup<MaladieFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MaladieFormService {
  createMaladieFormGroup(maladie: MaladieFormGroupInput = { id: null }): MaladieFormGroup {
    const maladieRawValue = {
      ...this.getFormDefaults(),
      ...maladie,
    };
    return new FormGroup<MaladieFormGroupContent>({
      id: new FormControl(
        { value: maladieRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nomMaladie: new FormControl(maladieRawValue.nomMaladie),
      symptomes: new FormControl(maladieRawValue.symptomes),
      animals: new FormControl(maladieRawValue.animals ?? []),
    });
  }

  getMaladie(form: MaladieFormGroup): IMaladie | NewMaladie {
    return form.getRawValue() as IMaladie | NewMaladie;
  }

  resetForm(form: MaladieFormGroup, maladie: MaladieFormGroupInput): void {
    const maladieRawValue = { ...this.getFormDefaults(), ...maladie };
    form.reset(
      {
        ...maladieRawValue,
        id: { value: maladieRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): MaladieFormDefaults {
    return {
      id: null,
      animals: [],
    };
  }
}
