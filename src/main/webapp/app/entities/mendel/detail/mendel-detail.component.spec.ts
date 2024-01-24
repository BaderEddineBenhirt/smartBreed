import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MendelDetailComponent } from './mendel-detail.component';

describe('Maladie Management Detail Component', () => {
  let comp: MendelDetailComponent;
  let fixture: ComponentFixture<MendelDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MendelDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ mendel: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(MendelDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(MendelDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load maladie on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.mendel).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
