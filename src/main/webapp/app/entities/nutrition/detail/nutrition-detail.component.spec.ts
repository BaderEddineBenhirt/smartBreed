import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NutritionDetailComponent } from './nutrition-detail.component';

describe('Nutrition Management Detail Component', () => {
  let comp: NutritionDetailComponent;
  let fixture: ComponentFixture<NutritionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NutritionDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ nutrition: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(NutritionDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(NutritionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load nutrition on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.nutrition).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
