import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../ferme.test-samples';

import { FermeFormService } from './ferme-form.service';

describe('Ferme Form Service', () => {
  let service: FermeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FermeFormService);
  });

  describe('Service methods', () => {
    describe('createFermeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFermeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            adresse: expect.any(Object),
            taille: expect.any(Object),
            user: expect.any(Object),
          })
        );
      });

      it('passing IFerme should create a new form with FormGroup', () => {
        const formGroup = service.createFermeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            adresse: expect.any(Object),
            taille: expect.any(Object),
            user: expect.any(Object),
          })
        );
      });
    });

    describe('getFerme', () => {
      it('should return NewFerme for default Ferme initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFermeFormGroup(sampleWithNewData);

        const ferme = service.getFerme(formGroup) as any;

        expect(ferme).toMatchObject(sampleWithNewData);
      });

      it('should return NewFerme for empty Ferme initial value', () => {
        const formGroup = service.createFermeFormGroup();

        const ferme = service.getFerme(formGroup) as any;

        expect(ferme).toMatchObject({});
      });

      it('should return IFerme', () => {
        const formGroup = service.createFermeFormGroup(sampleWithRequiredData);

        const ferme = service.getFerme(formGroup) as any;

        expect(ferme).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFerme should not enable id FormControl', () => {
        const formGroup = service.createFermeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFerme should disable id FormControl', () => {
        const formGroup = service.createFermeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
