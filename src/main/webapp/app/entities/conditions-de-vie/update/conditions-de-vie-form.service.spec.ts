import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../conditions-de-vie.test-samples';

import { ConditionsDeVieFormService } from './conditions-de-vie-form.service';

describe('ConditionsDeVie Form Service', () => {
  let service: ConditionsDeVieFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConditionsDeVieFormService);
  });

  describe('Service methods', () => {
    describe('createConditionsDeVieFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createConditionsDeVieFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ageMin: expect.any(Object),
            ageMax: expect.any(Object),
            temperature: expect.any(Object),
            vitesseAir: expect.any(Object),
            sol: expect.any(Object),
          })
        );
      });

      it('passing IConditionsDeVie should create a new form with FormGroup', () => {
        const formGroup = service.createConditionsDeVieFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ageMin: expect.any(Object),
            ageMax: expect.any(Object),
            temperature: expect.any(Object),
            vitesseAir: expect.any(Object),
            sol: expect.any(Object),
          })
        );
      });
    });

    describe('getConditionsDeVie', () => {
      it('should return NewConditionsDeVie for default ConditionsDeVie initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createConditionsDeVieFormGroup(sampleWithNewData);

        const conditionsDeVie = service.getConditionsDeVie(formGroup) as any;

        expect(conditionsDeVie).toMatchObject(sampleWithNewData);
      });

      it('should return NewConditionsDeVie for empty ConditionsDeVie initial value', () => {
        const formGroup = service.createConditionsDeVieFormGroup();

        const conditionsDeVie = service.getConditionsDeVie(formGroup) as any;

        expect(conditionsDeVie).toMatchObject({});
      });

      it('should return IConditionsDeVie', () => {
        const formGroup = service.createConditionsDeVieFormGroup(sampleWithRequiredData);

        const conditionsDeVie = service.getConditionsDeVie(formGroup) as any;

        expect(conditionsDeVie).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IConditionsDeVie should not enable id FormControl', () => {
        const formGroup = service.createConditionsDeVieFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewConditionsDeVie should disable id FormControl', () => {
        const formGroup = service.createConditionsDeVieFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
