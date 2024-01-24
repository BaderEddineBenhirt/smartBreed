import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISante } from '../sante.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../sante.test-samples';

import { SanteService } from './sante.service';

const requireRestSample: ISante = {
  ...sampleWithRequiredData,
};

describe('Sante Service', () => {
  let service: SanteService;
  let httpMock: HttpTestingController;
  let expectedResult: ISante | ISante[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SanteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Sante', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const sante = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(sante).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Sante', () => {
      const sante = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(sante).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Sante', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Sante', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Sante', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSanteToCollectionIfMissing', () => {
      it('should add a Sante to an empty array', () => {
        const sante: ISante = sampleWithRequiredData;
        expectedResult = service.addSanteToCollectionIfMissing([], sante);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(sante);
      });

      it('should not add a Sante to an array that contains it', () => {
        const sante: ISante = sampleWithRequiredData;
        const santeCollection: ISante[] = [
          {
            ...sante,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSanteToCollectionIfMissing(santeCollection, sante);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Sante to an array that doesn't contain it", () => {
        const sante: ISante = sampleWithRequiredData;
        const santeCollection: ISante[] = [sampleWithPartialData];
        expectedResult = service.addSanteToCollectionIfMissing(santeCollection, sante);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(sante);
      });

      it('should add only unique Sante to an array', () => {
        const santeArray: ISante[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const santeCollection: ISante[] = [sampleWithRequiredData];
        expectedResult = service.addSanteToCollectionIfMissing(santeCollection, ...santeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const sante: ISante = sampleWithRequiredData;
        const sante2: ISante = sampleWithPartialData;
        expectedResult = service.addSanteToCollectionIfMissing([], sante, sante2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(sante);
        expect(expectedResult).toContain(sante2);
      });

      it('should accept null and undefined values', () => {
        const sante: ISante = sampleWithRequiredData;
        expectedResult = service.addSanteToCollectionIfMissing([], null, sante, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(sante);
      });

      it('should return initial array if no Sante is added', () => {
        const santeCollection: ISante[] = [sampleWithRequiredData];
        expectedResult = service.addSanteToCollectionIfMissing(santeCollection, undefined, null);
        expect(expectedResult).toEqual(santeCollection);
      });
    });

    describe('compareSante', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSante(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSante(entity1, entity2);
        const compareResult2 = service.compareSante(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSante(entity1, entity2);
        const compareResult2 = service.compareSante(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSante(entity1, entity2);
        const compareResult2 = service.compareSante(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
