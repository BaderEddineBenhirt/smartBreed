import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMendel, Mendel } from '../mendel.model';

import { MendelService } from './mendel.service';

describe('Maladie Service', () => {
  let service: MendelService;
  let httpMock: HttpTestingController;
  let elemDefault: IMendel;
  let expectedResult: IMendel | IMendel[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MendelService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      father: 'S',
      mother: 'S',
      result: 'S',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Mendel logique', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Mendel()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Maladie', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          father: 'D',
          mother: 'D',
          result: 'D',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Mendel logiue', () => {
      const patchObject = Object.assign({}, new Mendel());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Mendel logue', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          father: 'A',
          mother: 'A',
          result: 'A',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Mendel logique', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addMaladieToCollectionIfMissing', () => {
      it('should add a Maladie to an empty array', () => {
        const maladie: IMendel = { id: 123 };
        expectedResult = service.addMendelToCollectionIfMissing([], maladie);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(maladie);
      });

      it('should not add a Maladie to an array that contains it', () => {
        const maladie: IMendel = { id: 123 };
        const maladieCollection: IMendel[] = [
          {
            ...maladie,
          },
          { id: 456 },
        ];
        expectedResult = service.addMendelToCollectionIfMissing(maladieCollection, maladie);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Mendel to an array that doesn't contain it", () => {
        const maladie: IMendel = { id: 123 };
        const maladieCollection: IMendel[] = [{ id: 456 }];
        expectedResult = service.addMendelToCollectionIfMissing(maladieCollection, maladie);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(maladie);
      });

      it('should add only unique Maladie to an array', () => {
        const maladieArray: IMendel[] = [{ id: 123 }, { id: 456 }, { id: 79261 }];
        const maladieCollection: IMendel[] = [{ id: 123 }];
        expectedResult = service.addMendelToCollectionIfMissing(maladieCollection, ...maladieArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const maladie: IMendel = { id: 123 };
        const maladie2: IMendel = { id: 456 };
        expectedResult = service.addMendelToCollectionIfMissing([], maladie, maladie2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(maladie);
        expect(expectedResult).toContain(maladie2);
      });

      it('should accept null and undefined values', () => {
        const maladie: IMendel = { id: 123 };
        expectedResult = service.addMendelToCollectionIfMissing([], null, maladie, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(maladie);
      });

      it('should return initial array if no Maladie is added', () => {
        const maladieCollection: IMendel[] = [{ id: 123 }];
        expectedResult = service.addMendelToCollectionIfMissing(maladieCollection, undefined, null);
        expect(expectedResult).toEqual(maladieCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
