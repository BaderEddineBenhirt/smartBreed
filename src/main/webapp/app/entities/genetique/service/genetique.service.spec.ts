import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IGenetique } from '../genetique.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../genetique.test-samples';

import { GenetiqueService } from './genetique.service';

const requireRestSample: IGenetique = {
  ...sampleWithRequiredData,
};

describe('Genetique Service', () => {
  let service: GenetiqueService;
  let httpMock: HttpTestingController;
  let expectedResult: IGenetique | IGenetique[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(GenetiqueService);
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

    it('should create a Genetique', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const genetique = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(genetique).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Genetique', () => {
      const genetique = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(genetique).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Genetique', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Genetique', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Genetique', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addGenetiqueToCollectionIfMissing', () => {
      it('should add a Genetique to an empty array', () => {
        const genetique: IGenetique = sampleWithRequiredData;
        expectedResult = service.addGenetiqueToCollectionIfMissing([], genetique);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(genetique);
      });

      it('should not add a Genetique to an array that contains it', () => {
        const genetique: IGenetique = sampleWithRequiredData;
        const genetiqueCollection: IGenetique[] = [
          {
            ...genetique,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addGenetiqueToCollectionIfMissing(genetiqueCollection, genetique);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Genetique to an array that doesn't contain it", () => {
        const genetique: IGenetique = sampleWithRequiredData;
        const genetiqueCollection: IGenetique[] = [sampleWithPartialData];
        expectedResult = service.addGenetiqueToCollectionIfMissing(genetiqueCollection, genetique);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(genetique);
      });

      it('should add only unique Genetique to an array', () => {
        const genetiqueArray: IGenetique[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const genetiqueCollection: IGenetique[] = [sampleWithRequiredData];
        expectedResult = service.addGenetiqueToCollectionIfMissing(genetiqueCollection, ...genetiqueArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const genetique: IGenetique = sampleWithRequiredData;
        const genetique2: IGenetique = sampleWithPartialData;
        expectedResult = service.addGenetiqueToCollectionIfMissing([], genetique, genetique2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(genetique);
        expect(expectedResult).toContain(genetique2);
      });

      it('should accept null and undefined values', () => {
        const genetique: IGenetique = sampleWithRequiredData;
        expectedResult = service.addGenetiqueToCollectionIfMissing([], null, genetique, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(genetique);
      });

      it('should return initial array if no Genetique is added', () => {
        const genetiqueCollection: IGenetique[] = [sampleWithRequiredData];
        expectedResult = service.addGenetiqueToCollectionIfMissing(genetiqueCollection, undefined, null);
        expect(expectedResult).toEqual(genetiqueCollection);
      });
    });

    describe('compareGenetique', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareGenetique(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareGenetique(entity1, entity2);
        const compareResult2 = service.compareGenetique(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareGenetique(entity1, entity2);
        const compareResult2 = service.compareGenetique(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareGenetique(entity1, entity2);
        const compareResult2 = service.compareGenetique(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
