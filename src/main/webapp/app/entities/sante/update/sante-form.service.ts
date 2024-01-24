import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISante, NewSante } from '../sante.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISante for edit and NewSanteFormGroupInput for create.
 */
type SanteFormGroupInput = ISante | PartialWithRequiredKeyOf<NewSante>;

type SanteFormDefaults = Pick<NewSante, 'id'>;

type SanteFormGroupContent = {
  id: FormControl<ISante['id'] | NewSante['id']>;
  traitementsPreventifs: FormControl<ISante['traitementsPreventifs']>;
  soins: FormControl<ISante['soins']>;
  vaccins: FormControl<ISante['vaccins']>;
  maladie: FormControl<ISante['maladie']>;
};

export type SanteFormGroup = FormGroup<SanteFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SanteFormService {
  createSanteFormGroup(sante: SanteFormGroupInput = { id: null }): SanteFormGroup {
    const santeRawValue = {
      ...this.getFormDefaults(),
      ...sante,
    };
    return new FormGroup<SanteFormGroupContent>({
      id: new FormControl(
        { value: santeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      traitementsPreventifs: new FormControl(santeRawValue.traitementsPreventifs),
      soins: new FormControl(santeRawValue.soins),
      vaccins: new FormControl(santeRawValue.vaccins),
      maladie: new FormControl(santeRawValue.maladie),
    });
  }

  getSante(form: SanteFormGroup): ISante | NewSante {
    return form.getRawValue() as ISante | NewSante;
  }

  resetForm(form: SanteFormGroup, sante: SanteFormGroupInput): void {
    const santeRawValue = { ...this.getFormDefaults(), ...sante };
    form.reset(
      {
        ...santeRawValue,
        id: { value: santeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SanteFormDefaults {
    return {
      id: null,
    };
  }
}
