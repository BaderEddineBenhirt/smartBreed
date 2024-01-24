import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ConditionsDeVieService } from '../service/conditions-de-vie.service';

import { ConditionsDeVieComponent } from './conditions-de-vie.component';

describe('ConditionsDeVie Management Component', () => {
  let comp: ConditionsDeVieComponent;
  let fixture: ComponentFixture<ConditionsDeVieComponent>;
  let service: ConditionsDeVieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'conditions-de-vie', component: ConditionsDeVieComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [ConditionsDeVieComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(ConditionsDeVieComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ConditionsDeVieComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ConditionsDeVieService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.conditionsDeVies?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to conditionsDeVieService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getConditionsDeVieIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getConditionsDeVieIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
