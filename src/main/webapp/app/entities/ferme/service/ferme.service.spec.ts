import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IFerme } from '../ferme.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../ferme.test-samples';

import { FermeService } from './ferme.service';

const requireRestSample: IFerme = {
  ...sampleWithRequiredData,
};

describe('Ferme Service', () => {
  let service: FermeService;
  let httpMock: HttpTestingController;
  let expectedResult: IFerme | IFerme[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FermeService);
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

    it('should create a Ferme', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const ferme = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(ferme).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Ferme', () => {
      const ferme = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(ferme).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Ferme', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Ferme', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Ferme', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFermeToCollectionIfMissing', () => {
      it('should add a Ferme to an empty array', () => {
        const ferme: IFerme = sampleWithRequiredData;
        expectedResult = service.addFermeToCollectionIfMissing([], ferme);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(ferme);
      });

      it('should not add a Ferme to an array that contains it', () => {
        const ferme: IFerme = sampleWithRequiredData;
        const fermeCollection: IFerme[] = [
          {
            ...ferme,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFermeToCollectionIfMissing(fermeCollection, ferme);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Ferme to an array that doesn't contain it", () => {
        const ferme: IFerme = sampleWithRequiredData;
        const fermeCollection: IFerme[] = [sampleWithPartialData];
        expectedResult = service.addFermeToCollectionIfMissing(fermeCollection, ferme);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(ferme);
      });

      it('should add only unique Ferme to an array', () => {
        const fermeArray: IFerme[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const fermeCollection: IFerme[] = [sampleWithRequiredData];
        expectedResult = service.addFermeToCollectionIfMissing(fermeCollection, ...fermeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const ferme: IFerme = sampleWithRequiredData;
        const ferme2: IFerme = sampleWithPartialData;
        expectedResult = service.addFermeToCollectionIfMissing([], ferme, ferme2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(ferme);
        expect(expectedResult).toContain(ferme2);
      });

      it('should accept null and undefined values', () => {
        const ferme: IFerme = sampleWithRequiredData;
        expectedResult = service.addFermeToCollectionIfMissing([], null, ferme, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(ferme);
      });

      it('should return initial array if no Ferme is added', () => {
        const fermeCollection: IFerme[] = [sampleWithRequiredData];
        expectedResult = service.addFermeToCollectionIfMissing(fermeCollection, undefined, null);
        expect(expectedResult).toEqual(fermeCollection);
      });
    });

    describe('compareFerme', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFerme(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFerme(entity1, entity2);
        const compareResult2 = service.compareFerme(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFerme(entity1, entity2);
        const compareResult2 = service.compareFerme(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFerme(entity1, entity2);
        const compareResult2 = service.compareFerme(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
