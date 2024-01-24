import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SanteDetailComponent } from './sante-detail.component';

describe('Sante Management Detail Component', () => {
  let comp: SanteDetailComponent;
  let fixture: ComponentFixture<SanteDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SanteDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ sante: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(SanteDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SanteDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load sante on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.sante).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
