import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../suivi.test-samples';

import { SuiviFormService } from './suivi-form.service';

describe('Suivi Form Service', () => {
  let service: SuiviFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuiviFormService);
  });

  describe('Service methods', () => {
    describe('createSuiviFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSuiviFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            poids0: expect.any(Object),
            poids30: expect.any(Object),
            poids90: expect.any(Object),
            gmq30: expect.any(Object),
            gmq3070: expect.any(Object),
            changeDents: expect.any(Object),
            animal: expect.any(Object),
          })
        );
      });

      it('passing ISuivi should create a new form with FormGroup', () => {
        const formGroup = service.createSuiviFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            poids0: expect.any(Object),
            poids30: expect.any(Object),
            poids90: expect.any(Object),
            gmq30: expect.any(Object),
            gmq3070: expect.any(Object),
            changeDents: expect.any(Object),
            animal: expect.any(Object),
          })
        );
      });
    });

    describe('getSuivi', () => {
      it('should return NewSuivi for default Suivi initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSuiviFormGroup(sampleWithNewData);

        const suivi = service.getSuivi(formGroup) as any;

        expect(suivi).toMatchObject(sampleWithNewData);
      });

      it('should return NewSuivi for empty Suivi initial value', () => {
        const formGroup = service.createSuiviFormGroup();

        const suivi = service.getSuivi(formGroup) as any;

        expect(suivi).toMatchObject({});
      });

      it('should return ISuivi', () => {
        const formGroup = service.createSuiviFormGroup(sampleWithRequiredData);

        const suivi = service.getSuivi(formGroup) as any;

        expect(suivi).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISuivi should not enable id FormControl', () => {
        const formGroup = service.createSuiviFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSuivi should disable id FormControl', () => {
        const formGroup = service.createSuiviFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
