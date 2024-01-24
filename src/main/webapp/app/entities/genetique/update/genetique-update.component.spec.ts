import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { GenetiqueFormService } from './genetique-form.service';
import { GenetiqueService } from '../service/genetique.service';
import { IGenetique } from '../genetique.model';

import { GenetiqueUpdateComponent } from './genetique-update.component';

describe('Genetique Management Update Component', () => {
  let comp: GenetiqueUpdateComponent;
  let fixture: ComponentFixture<GenetiqueUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let genetiqueFormService: GenetiqueFormService;
  let genetiqueService: GenetiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [GenetiqueUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(GenetiqueUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(GenetiqueUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    genetiqueFormService = TestBed.inject(GenetiqueFormService);
    genetiqueService = TestBed.inject(GenetiqueService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const genetique: IGenetique = { id: 456 };

      activatedRoute.data = of({ genetique });
      comp.ngOnInit();

      expect(comp.genetique).toEqual(genetique);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGenetique>>();
      const genetique = { id: 123 };
      jest.spyOn(genetiqueFormService, 'getGenetique').mockReturnValue(genetique);
      jest.spyOn(genetiqueService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ genetique });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: genetique }));
      saveSubject.complete();

      // THEN
      expect(genetiqueFormService.getGenetique).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(genetiqueService.update).toHaveBeenCalledWith(expect.objectContaining(genetique));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGenetique>>();
      const genetique = { id: 123 };
      jest.spyOn(genetiqueFormService, 'getGenetique').mockReturnValue({ id: null });
      jest.spyOn(genetiqueService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ genetique: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: genetique }));
      saveSubject.complete();

      // THEN
      expect(genetiqueFormService.getGenetique).toHaveBeenCalled();
      expect(genetiqueService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGenetique>>();
      const genetique = { id: 123 };
      jest.spyOn(genetiqueService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ genetique });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(genetiqueService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
