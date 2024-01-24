import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GenetiqueDetailComponent } from './genetique-detail.component';

describe('Genetique Management Detail Component', () => {
  let comp: GenetiqueDetailComponent;
  let fixture: ComponentFixture<GenetiqueDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenetiqueDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ genetique: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(GenetiqueDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(GenetiqueDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load genetique on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.genetique).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
