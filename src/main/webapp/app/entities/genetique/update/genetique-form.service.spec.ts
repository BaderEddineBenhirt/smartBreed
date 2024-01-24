import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../genetique.test-samples';

import { GenetiqueFormService } from './genetique-form.service';

describe('Genetique Form Service', () => {
  let service: GenetiqueFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenetiqueFormService);
  });

  describe('Service methods', () => {
    describe('createGenetiqueFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createGenetiqueFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            couleur: expect.any(Object),
            taille: expect.any(Object),
            aptitudesLaitiere: expect.any(Object),
            aptitudesBoucheres: expect.any(Object),
            aptitudesMaternelles: expect.any(Object),
          })
        );
      });

      it('passing IGenetique should create a new form with FormGroup', () => {
        const formGroup = service.createGenetiqueFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            couleur: expect.any(Object),
            taille: expect.any(Object),
            aptitudesLaitiere: expect.any(Object),
            aptitudesBoucheres: expect.any(Object),
            aptitudesMaternelles: expect.any(Object),
          })
        );
      });
    });

    describe('getGenetique', () => {
      it('should return NewGenetique for default Genetique initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createGenetiqueFormGroup(sampleWithNewData);

        const genetique = service.getGenetique(formGroup) as any;

        expect(genetique).toMatchObject(sampleWithNewData);
      });

      it('should return NewGenetique for empty Genetique initial value', () => {
        const formGroup = service.createGenetiqueFormGroup();

        const genetique = service.getGenetique(formGroup) as any;

        expect(genetique).toMatchObject({});
      });

      it('should return IGenetique', () => {
        const formGroup = service.createGenetiqueFormGroup(sampleWithRequiredData);

        const genetique = service.getGenetique(formGroup) as any;

        expect(genetique).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IGenetique should not enable id FormControl', () => {
        const formGroup = service.createGenetiqueFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewGenetique should disable id FormControl', () => {
        const formGroup = service.createGenetiqueFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
