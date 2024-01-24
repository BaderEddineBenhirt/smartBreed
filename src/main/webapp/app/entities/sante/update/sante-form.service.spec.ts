import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../sante.test-samples';

import { SanteFormService } from './sante-form.service';

describe('Sante Form Service', () => {
  let service: SanteFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SanteFormService);
  });

  describe('Service methods', () => {
    describe('createSanteFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSanteFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            traitementsPreventifs: expect.any(Object),
            soins: expect.any(Object),
            vaccins: expect.any(Object),
            maladie: expect.any(Object),
          })
        );
      });

      it('passing ISante should create a new form with FormGroup', () => {
        const formGroup = service.createSanteFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            traitementsPreventifs: expect.any(Object),
            soins: expect.any(Object),
            vaccins: expect.any(Object),
            maladie: expect.any(Object),
          })
        );
      });
    });

    describe('getSante', () => {
      it('should return NewSante for default Sante initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSanteFormGroup(sampleWithNewData);

        const sante = service.getSante(formGroup) as any;

        expect(sante).toMatchObject(sampleWithNewData);
      });

      it('should return NewSante for empty Sante initial value', () => {
        const formGroup = service.createSanteFormGroup();

        const sante = service.getSante(formGroup) as any;

        expect(sante).toMatchObject({});
      });

      it('should return ISante', () => {
        const formGroup = service.createSanteFormGroup(sampleWithRequiredData);

        const sante = service.getSante(formGroup) as any;

        expect(sante).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISante should not enable id FormControl', () => {
        const formGroup = service.createSanteFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSante should disable id FormControl', () => {
        const formGroup = service.createSanteFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
