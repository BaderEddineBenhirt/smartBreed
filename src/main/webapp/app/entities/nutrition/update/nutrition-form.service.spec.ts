import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../nutrition.test-samples';

import { NutritionFormService } from './nutrition-form.service';

describe('Nutrition Form Service', () => {
  let service: NutritionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutritionFormService);
  });

  describe('Service methods', () => {
    describe('createNutritionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createNutritionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            melasse: expect.any(Object),
            paile: expect.any(Object),
            tourteauTournesol: expect.any(Object),
            bettraveSucriere: expect.any(Object),
            cmv: expect.any(Object),
            ageMin: expect.any(Object),
            ageMax: expect.any(Object),
            animal: expect.any(Object),
          })
        );
      });

      it('passing INutrition should create a new form with FormGroup', () => {
        const formGroup = service.createNutritionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            melasse: expect.any(Object),
            paile: expect.any(Object),
            tourteauTournesol: expect.any(Object),
            bettraveSucriere: expect.any(Object),
            cmv: expect.any(Object),
            ageMin: expect.any(Object),
            ageMax: expect.any(Object),
            animal: expect.any(Object),
          })
        );
      });
    });

    describe('getNutrition', () => {
      it('should return NewNutrition for default Nutrition initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createNutritionFormGroup(sampleWithNewData);

        const nutrition = service.getNutrition(formGroup) as any;

        expect(nutrition).toMatchObject(sampleWithNewData);
      });

      it('should return NewNutrition for empty Nutrition initial value', () => {
        const formGroup = service.createNutritionFormGroup();

        const nutrition = service.getNutrition(formGroup) as any;

        expect(nutrition).toMatchObject({});
      });

      it('should return INutrition', () => {
        const formGroup = service.createNutritionFormGroup(sampleWithRequiredData);

        const nutrition = service.getNutrition(formGroup) as any;

        expect(nutrition).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing INutrition should not enable id FormControl', () => {
        const formGroup = service.createNutritionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewNutrition should disable id FormControl', () => {
        const formGroup = service.createNutritionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
