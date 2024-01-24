import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IGenetique, NewGenetique } from '../genetique.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IGenetique for edit and NewGenetiqueFormGroupInput for create.
 */
type GenetiqueFormGroupInput = IGenetique | PartialWithRequiredKeyOf<NewGenetique>;

type GenetiqueFormDefaults = Pick<NewGenetique, 'id'>;

type GenetiqueFormGroupContent = {
  id: FormControl<IGenetique['id'] | NewGenetique['id']>;
  couleur: FormControl<IGenetique['couleur']>;
  taille: FormControl<IGenetique['taille']>;
  aptitudesLaitiere: FormControl<IGenetique['aptitudesLaitiere']>;
  aptitudesBoucheres: FormControl<IGenetique['aptitudesBoucheres']>;
  aptitudesMaternelles: FormControl<IGenetique['aptitudesMaternelles']>;
};

export type GenetiqueFormGroup = FormGroup<GenetiqueFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class GenetiqueFormService {
  createGenetiqueFormGroup(genetique: GenetiqueFormGroupInput = { id: null }): GenetiqueFormGroup {
    const genetiqueRawValue = {
      ...this.getFormDefaults(),
      ...genetique,
    };
    return new FormGroup<GenetiqueFormGroupContent>({
      id: new FormControl(
        { value: genetiqueRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      couleur: new FormControl(genetiqueRawValue.couleur),
      taille: new FormControl(genetiqueRawValue.taille),
      aptitudesLaitiere: new FormControl(genetiqueRawValue.aptitudesLaitiere),
      aptitudesBoucheres: new FormControl(genetiqueRawValue.aptitudesBoucheres),
      aptitudesMaternelles: new FormControl(genetiqueRawValue.aptitudesMaternelles),
    });
  }

  getGenetique(form: GenetiqueFormGroup): IGenetique | NewGenetique {
    return form.getRawValue() as IGenetique | NewGenetique;
  }

  resetForm(form: GenetiqueFormGroup, genetique: GenetiqueFormGroupInput): void {
    const genetiqueRawValue = { ...this.getFormDefaults(), ...genetique };
    form.reset(
      {
        ...genetiqueRawValue,
        id: { value: genetiqueRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): GenetiqueFormDefaults {
    return {
      id: null,
    };
  }
}
