import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { MaladieService } from '../service/maladie.service';

import { MaladieComponent } from './maladie.component';

describe('Maladie Management Component', () => {
  let comp: MaladieComponent;
  let fixture: ComponentFixture<MaladieComponent>;
  let service: MaladieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'maladie', component: MaladieComponent }]), HttpClientTestingModule],
      declarations: [MaladieComponent],
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
      .overrideTemplate(MaladieComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MaladieComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(MaladieService);

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
    expect(comp.maladies?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to maladieService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getMaladieIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getMaladieIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
