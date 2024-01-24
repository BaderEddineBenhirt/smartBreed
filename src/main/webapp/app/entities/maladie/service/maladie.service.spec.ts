import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMaladie } from '../maladie.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../maladie.test-samples';

import { MaladieService } from './maladie.service';

const requireRestSample: IMaladie = {
  ...sampleWithRequiredData,
};

describe('Maladie Service', () => {
  let service: MaladieService;
  let httpMock: HttpTestingController;
  let expectedResult: IMaladie | IMaladie[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MaladieService);
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

    it('should create a Maladie', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const maladie = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(maladie).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Maladie', () => {
      const maladie = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(maladie).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Maladie', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Maladie', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Maladie', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addMaladieToCollectionIfMissing', () => {
      it('should add a Maladie to an empty array', () => {
        const maladie: IMaladie = sampleWithRequiredData;
        expectedResult = service.addMaladieToCollectionIfMissing([], maladie);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(maladie);
      });

      it('should not add a Maladie to an array that contains it', () => {
        const maladie: IMaladie = sampleWithRequiredData;
        const maladieCollection: IMaladie[] = [
          {
            ...maladie,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addMaladieToCollectionIfMissing(maladieCollection, maladie);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Maladie to an array that doesn't contain it", () => {
        const maladie: IMaladie = sampleWithRequiredData;
        const maladieCollection: IMaladie[] = [sampleWithPartialData];
        expectedResult = service.addMaladieToCollectionIfMissing(maladieCollection, maladie);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(maladie);
      });

      it('should add only unique Maladie to an array', () => {
        const maladieArray: IMaladie[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const maladieCollection: IMaladie[] = [sampleWithRequiredData];
        expectedResult = service.addMaladieToCollectionIfMissing(maladieCollection, ...maladieArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const maladie: IMaladie = sampleWithRequiredData;
        const maladie2: IMaladie = sampleWithPartialData;
        expectedResult = service.addMaladieToCollectionIfMissing([], maladie, maladie2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(maladie);
        expect(expectedResult).toContain(maladie2);
      });

      it('should accept null and undefined values', () => {
        const maladie: IMaladie = sampleWithRequiredData;
        expectedResult = service.addMaladieToCollectionIfMissing([], null, maladie, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(maladie);
      });

      it('should return initial array if no Maladie is added', () => {
        const maladieCollection: IMaladie[] = [sampleWithRequiredData];
        expectedResult = service.addMaladieToCollectionIfMissing(maladieCollection, undefined, null);
        expect(expectedResult).toEqual(maladieCollection);
      });
    });

    describe('compareMaladie', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareMaladie(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareMaladie(entity1, entity2);
        const compareResult2 = service.compareMaladie(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareMaladie(entity1, entity2);
        const compareResult2 = service.compareMaladie(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareMaladie(entity1, entity2);
        const compareResult2 = service.compareMaladie(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
