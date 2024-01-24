import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MaladieDetailComponent } from './maladie-detail.component';

describe('Maladie Management Detail Component', () => {
  let comp: MaladieDetailComponent;
  let fixture: ComponentFixture<MaladieDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaladieDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ maladie: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(MaladieDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(MaladieDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load maladie on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.maladie).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
