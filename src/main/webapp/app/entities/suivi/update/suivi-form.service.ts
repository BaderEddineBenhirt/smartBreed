import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISuivi, NewSuivi } from '../suivi.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISuivi for edit and NewSuiviFormGroupInput for create.
 */
type SuiviFormGroupInput = ISuivi | PartialWithRequiredKeyOf<NewSuivi>;

type SuiviFormDefaults = Pick<NewSuivi, 'id'>;

type SuiviFormGroupContent = {
  id: FormControl<ISuivi['id'] | NewSuivi['id']>;
  poids0: FormControl<ISuivi['poids0']>;
  poids30: FormControl<ISuivi['poids30']>;
  poids90: FormControl<ISuivi['poids90']>;
  gmq30: FormControl<ISuivi['gmq30']>;
  gmq3070: FormControl<ISuivi['gmq3070']>;
  changeDents: FormControl<ISuivi['changeDents']>;
  animal: FormControl<ISuivi['animal']>;
};

export type SuiviFormGroup = FormGroup<SuiviFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SuiviFormService {
  createSuiviFormGroup(suivi: SuiviFormGroupInput = { id: null }): SuiviFormGroup {
    const suiviRawValue = {
      ...this.getFormDefaults(),
      ...suivi,
    };
    return new FormGroup<SuiviFormGroupContent>({
      id: new FormControl(
        { value: suiviRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      poids0: new FormControl(suiviRawValue.poids0),
      poids30: new FormControl(suiviRawValue.poids30),
      poids90: new FormControl(suiviRawValue.poids90),
      gmq30: new FormControl(suiviRawValue.gmq30),
      gmq3070: new FormControl(suiviRawValue.gmq3070),
      changeDents: new FormControl(suiviRawValue.changeDents),
      animal: new FormControl(suiviRawValue.animal),
    });
  }

  getSuivi(form: SuiviFormGroup): ISuivi | NewSuivi {
    return form.getRawValue() as ISuivi | NewSuivi;
  }

  resetForm(form: SuiviFormGroup, suivi: SuiviFormGroupInput): void {
    const suiviRawValue = { ...this.getFormDefaults(), ...suivi };
    form.reset(
      {
        ...suiviRawValue,
        id: { value: suiviRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SuiviFormDefaults {
    return {
      id: null,
    };
  }
}
