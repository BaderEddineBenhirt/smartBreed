import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../maladie.test-samples';

import { MaladieFormService } from './maladie-form.service';

describe('Maladie Form Service', () => {
  let service: MaladieFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaladieFormService);
  });

  describe('Service methods', () => {
    describe('createMaladieFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createMaladieFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nomMaladie: expect.any(Object),
            symptomes: expect.any(Object),
            animals: expect.any(Object),
          })
        );
      });

      it('passing IMaladie should create a new form with FormGroup', () => {
        const formGroup = service.createMaladieFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nomMaladie: expect.any(Object),
            symptomes: expect.any(Object),
            animals: expect.any(Object),
          })
        );
      });
    });

    describe('getMaladie', () => {
      it('should return NewMaladie for default Maladie initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createMaladieFormGroup(sampleWithNewData);

        const maladie = service.getMaladie(formGroup) as any;

        expect(maladie).toMatchObject(sampleWithNewData);
      });

      it('should return NewMaladie for empty Maladie initial value', () => {
        const formGroup = service.createMaladieFormGroup();

        const maladie = service.getMaladie(formGroup) as any;

        expect(maladie).toMatchObject({});
      });

      it('should return IMaladie', () => {
        const formGroup = service.createMaladieFormGroup(sampleWithRequiredData);

        const maladie = service.getMaladie(formGroup) as any;

        expect(maladie).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IMaladie should not enable id FormControl', () => {
        const formGroup = service.createMaladieFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewMaladie should disable id FormControl', () => {
        const formGroup = service.createMaladieFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
