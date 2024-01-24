import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { INutrition } from '../nutrition.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../nutrition.test-samples';

import { NutritionService } from './nutrition.service';

const requireRestSample: INutrition = {
  ...sampleWithRequiredData,
};

describe('Nutrition Service', () => {
  let service: NutritionService;
  let httpMock: HttpTestingController;
  let expectedResult: INutrition | INutrition[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(NutritionService);
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

    it('should create a Nutrition', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const nutrition = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(nutrition).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Nutrition', () => {
      const nutrition = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(nutrition).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Nutrition', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Nutrition', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Nutrition', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addNutritionToCollectionIfMissing', () => {
      it('should add a Nutrition to an empty array', () => {
        const nutrition: INutrition = sampleWithRequiredData;
        expectedResult = service.addNutritionToCollectionIfMissing([], nutrition);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(nutrition);
      });

      it('should not add a Nutrition to an array that contains it', () => {
        const nutrition: INutrition = sampleWithRequiredData;
        const nutritionCollection: INutrition[] = [
          {
            ...nutrition,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addNutritionToCollectionIfMissing(nutritionCollection, nutrition);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Nutrition to an array that doesn't contain it", () => {
        const nutrition: INutrition = sampleWithRequiredData;
        const nutritionCollection: INutrition[] = [sampleWithPartialData];
        expectedResult = service.addNutritionToCollectionIfMissing(nutritionCollection, nutrition);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(nutrition);
      });

      it('should add only unique Nutrition to an array', () => {
        const nutritionArray: INutrition[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const nutritionCollection: INutrition[] = [sampleWithRequiredData];
        expectedResult = service.addNutritionToCollectionIfMissing(nutritionCollection, ...nutritionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const nutrition: INutrition = sampleWithRequiredData;
        const nutrition2: INutrition = sampleWithPartialData;
        expectedResult = service.addNutritionToCollectionIfMissing([], nutrition, nutrition2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(nutrition);
        expect(expectedResult).toContain(nutrition2);
      });

      it('should accept null and undefined values', () => {
        const nutrition: INutrition = sampleWithRequiredData;
        expectedResult = service.addNutritionToCollectionIfMissing([], null, nutrition, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(nutrition);
      });

      it('should return initial array if no Nutrition is added', () => {
        const nutritionCollection: INutrition[] = [sampleWithRequiredData];
        expectedResult = service.addNutritionToCollectionIfMissing(nutritionCollection, undefined, null);
        expect(expectedResult).toEqual(nutritionCollection);
      });
    });

    describe('compareNutrition', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareNutrition(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareNutrition(entity1, entity2);
        const compareResult2 = service.compareNutrition(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareNutrition(entity1, entity2);
        const compareResult2 = service.compareNutrition(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareNutrition(entity1, entity2);
        const compareResult2 = service.compareNutrition(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
