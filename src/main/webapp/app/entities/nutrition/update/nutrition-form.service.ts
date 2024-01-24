import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { INutrition, NewNutrition } from '../nutrition.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts INutrition for edit and NewNutritionFormGroupInput for create.
 */
type NutritionFormGroupInput = INutrition | PartialWithRequiredKeyOf<NewNutrition>;

type NutritionFormDefaults = Pick<NewNutrition, 'id'>;

type NutritionFormGroupContent = {
  id: FormControl<INutrition['id'] | NewNutrition['id']>;
  melasse: FormControl<INutrition['melasse']>;
  paile: FormControl<INutrition['paile']>;
  tourteauTournesol: FormControl<INutrition['tourteauTournesol']>;
  bettraveSucriere: FormControl<INutrition['bettraveSucriere']>;
  cmv: FormControl<INutrition['cmv']>;
  ageMin: FormControl<INutrition['ageMin']>;
  ageMax: FormControl<INutrition['ageMax']>;
  animal: FormControl<INutrition['animal']>;
};

export type NutritionFormGroup = FormGroup<NutritionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class NutritionFormService {
  createNutritionFormGroup(nutrition: NutritionFormGroupInput = { id: null }): NutritionFormGroup {
    const nutritionRawValue = {
      ...this.getFormDefaults(),
      ...nutrition,
    };
    return new FormGroup<NutritionFormGroupContent>({
      id: new FormControl(
        { value: nutritionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      melasse: new FormControl(nutritionRawValue.melasse),
      paile: new FormControl(nutritionRawValue.paile),
      tourteauTournesol: new FormControl(nutritionRawValue.tourteauTournesol),
      bettraveSucriere: new FormControl(nutritionRawValue.bettraveSucriere),
      cmv: new FormControl(nutritionRawValue.cmv),
      ageMin: new FormControl(nutritionRawValue.ageMin),
      ageMax: new FormControl(nutritionRawValue.ageMax),
      animal: new FormControl(nutritionRawValue.animal),
    });
  }

  getNutrition(form: NutritionFormGroup): INutrition | NewNutrition {
    return form.getRawValue() as INutrition | NewNutrition;
  }

  resetForm(form: NutritionFormGroup, nutrition: NutritionFormGroupInput): void {
    const nutritionRawValue = { ...this.getFormDefaults(), ...nutrition };
    form.reset(
      {
        ...nutritionRawValue,
        id: { value: nutritionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): NutritionFormDefaults {
    return {
      id: null,
    };
  }
}
