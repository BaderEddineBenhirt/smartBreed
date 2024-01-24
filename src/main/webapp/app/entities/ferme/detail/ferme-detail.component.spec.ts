import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FermeDetailComponent } from './ferme-detail.component';

describe('Ferme Management Detail Component', () => {
  let comp: FermeDetailComponent;
  let fixture: ComponentFixture<FermeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FermeDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ ferme: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(FermeDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(FermeDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load ferme on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.ferme).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
