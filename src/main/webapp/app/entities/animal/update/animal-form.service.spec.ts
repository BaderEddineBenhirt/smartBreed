import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../animal.test-samples';

import { AnimalFormService } from './animal-form.service';

describe('Animal Form Service', () => {
  let service: AnimalFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimalFormService);
  });

  describe('Service methods', () => {
    describe('createAnimalFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAnimalFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ref: expect.any(Object),
            age: expect.any(Object),
            genre: expect.any(Object),
            poids: expect.any(Object),
            refMere: expect.any(Object),
            refPere: expect.any(Object),
            type: expect.any(Object),
            race: expect.any(Object),
            genetique: expect.any(Object),
            conditionsDeVie: expect.any(Object),
            maladies: expect.any(Object),
            ferme: expect.any(Object),
          })
        );
      });

      it('passing IAnimal should create a new form with FormGroup', () => {
        const formGroup = service.createAnimalFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ref: expect.any(Object),
            age: expect.any(Object),
            genre: expect.any(Object),
            poids: expect.any(Object),
            refMere: expect.any(Object),
            refPere: expect.any(Object),
            type: expect.any(Object),
            race: expect.any(Object),
            genetique: expect.any(Object),
            conditionsDeVie: expect.any(Object),
            maladies: expect.any(Object),
            ferme: expect.any(Object),
          })
        );
      });
    });

    describe('getAnimal', () => {
      it('should return NewAnimal for default Animal initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAnimalFormGroup(sampleWithNewData);

        const animal = service.getAnimal(formGroup) as any;

        expect(animal).toMatchObject(sampleWithNewData);
      });

      it('should return NewAnimal for empty Animal initial value', () => {
        const formGroup = service.createAnimalFormGroup();

        const animal = service.getAnimal(formGroup) as any;

        expect(animal).toMatchObject({});
      });

      it('should return IAnimal', () => {
        const formGroup = service.createAnimalFormGroup(sampleWithRequiredData);

        const animal = service.getAnimal(formGroup) as any;

        expect(animal).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAnimal should not enable id FormControl', () => {
        const formGroup = service.createAnimalFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAnimal should disable id FormControl', () => {
        const formGroup = service.createAnimalFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
