import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AnimalDetailComponent } from './animal-detail.component';

describe('Animal Management Detail Component', () => {
  let comp: AnimalDetailComponent;
  let fixture: ComponentFixture<AnimalDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimalDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ animal: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AnimalDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AnimalDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load animal on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.animal).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
