import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IConditionsDeVie, NewConditionsDeVie } from '../conditions-de-vie.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IConditionsDeVie for edit and NewConditionsDeVieFormGroupInput for create.
 */
type ConditionsDeVieFormGroupInput = IConditionsDeVie | PartialWithRequiredKeyOf<NewConditionsDeVie>;

type ConditionsDeVieFormDefaults = Pick<NewConditionsDeVie, 'id'>;

type ConditionsDeVieFormGroupContent = {
  id: FormControl<IConditionsDeVie['id'] | NewConditionsDeVie['id']>;
  ageMin: FormControl<IConditionsDeVie['ageMin']>;
  ageMax: FormControl<IConditionsDeVie['ageMax']>;
  temperature: FormControl<IConditionsDeVie['temperature']>;
  vitesseAir: FormControl<IConditionsDeVie['vitesseAir']>;
  sol: FormControl<IConditionsDeVie['sol']>;
};

export type ConditionsDeVieFormGroup = FormGroup<ConditionsDeVieFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ConditionsDeVieFormService {
  createConditionsDeVieFormGroup(conditionsDeVie: ConditionsDeVieFormGroupInput = { id: null }): ConditionsDeVieFormGroup {
    const conditionsDeVieRawValue = {
      ...this.getFormDefaults(),
      ...conditionsDeVie,
    };
    return new FormGroup<ConditionsDeVieFormGroupContent>({
      id: new FormControl(
        { value: conditionsDeVieRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      ageMin: new FormControl(conditionsDeVieRawValue.ageMin),
      ageMax: new FormControl(conditionsDeVieRawValue.ageMax),
      temperature: new FormControl(conditionsDeVieRawValue.temperature),
      vitesseAir: new FormControl(conditionsDeVieRawValue.vitesseAir),
      sol: new FormControl(conditionsDeVieRawValue.sol),
    });
  }

  getConditionsDeVie(form: ConditionsDeVieFormGroup): IConditionsDeVie | NewConditionsDeVie {
    return form.getRawValue() as IConditionsDeVie | NewConditionsDeVie;
  }

  resetForm(form: ConditionsDeVieFormGroup, conditionsDeVie: ConditionsDeVieFormGroupInput): void {
    const conditionsDeVieRawValue = { ...this.getFormDefaults(), ...conditionsDeVie };
    form.reset(
      {
        ...conditionsDeVieRawValue,
        id: { value: conditionsDeVieRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ConditionsDeVieFormDefaults {
    return {
      id: null,
    };
  }
}
