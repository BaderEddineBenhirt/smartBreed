import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFerme, NewFerme } from '../ferme.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFerme for edit and NewFermeFormGroupInput for create.
 */
type FermeFormGroupInput = IFerme | PartialWithRequiredKeyOf<NewFerme>;

type FermeFormDefaults = Pick<NewFerme, 'id'>;

type FermeFormGroupContent = {
  id: FormControl<IFerme['id'] | NewFerme['id']>;
  adresse: FormControl<IFerme['adresse']>;
  taille: FormControl<IFerme['taille']>;
  user: FormControl<IFerme['user']>;
};

export type FermeFormGroup = FormGroup<FermeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FermeFormService {
  createFermeFormGroup(ferme: FermeFormGroupInput = { id: null }): FermeFormGroup {
    const fermeRawValue = {
      ...this.getFormDefaults(),
      ...ferme,
    };
    return new FormGroup<FermeFormGroupContent>({
      id: new FormControl(
        { value: fermeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      adresse: new FormControl(fermeRawValue.adresse),
      taille: new FormControl(fermeRawValue.taille),
      user: new FormControl(fermeRawValue.user),
    });
  }

  getFerme(form: FermeFormGroup): IFerme | NewFerme {
    return form.getRawValue() as IFerme | NewFerme;
  }

  resetForm(form: FermeFormGroup, ferme: FermeFormGroupInput): void {
    const fermeRawValue = { ...this.getFormDefaults(), ...ferme };
    form.reset(
      {
        ...fermeRawValue,
        id: { value: fermeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FermeFormDefaults {
    return {
      id: null,
    };
  }
}
