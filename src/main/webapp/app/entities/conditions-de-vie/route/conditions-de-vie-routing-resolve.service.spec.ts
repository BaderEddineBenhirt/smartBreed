import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IConditionsDeVie } from '../conditions-de-vie.model';
import { ConditionsDeVieService } from '../service/conditions-de-vie.service';

import { ConditionsDeVieRoutingResolveService } from './conditions-de-vie-routing-resolve.service';

describe('ConditionsDeVie routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ConditionsDeVieRoutingResolveService;
  let service: ConditionsDeVieService;
  let resultConditionsDeVie: IConditionsDeVie | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(ConditionsDeVieRoutingResolveService);
    service = TestBed.inject(ConditionsDeVieService);
    resultConditionsDeVie = undefined;
  });

  describe('resolve', () => {
    it('should return IConditionsDeVie returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultConditionsDeVie = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultConditionsDeVie).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultConditionsDeVie = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultConditionsDeVie).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IConditionsDeVie>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultConditionsDeVie = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultConditionsDeVie).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
