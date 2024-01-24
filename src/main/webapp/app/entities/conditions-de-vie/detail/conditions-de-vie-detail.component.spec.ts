import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ConditionsDeVieDetailComponent } from './conditions-de-vie-detail.component';

describe('ConditionsDeVie Management Detail Component', () => {
  let comp: ConditionsDeVieDetailComponent;
  let fixture: ComponentFixture<ConditionsDeVieDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConditionsDeVieDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ conditionsDeVie: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ConditionsDeVieDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ConditionsDeVieDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load conditionsDeVie on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.conditionsDeVie).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
