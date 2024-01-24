import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ConditionsDeVieFormService } from './conditions-de-vie-form.service';
import { ConditionsDeVieService } from '../service/conditions-de-vie.service';
import { IConditionsDeVie } from '../conditions-de-vie.model';

import { ConditionsDeVieUpdateComponent } from './conditions-de-vie-update.component';

describe('ConditionsDeVie Management Update Component', () => {
  let comp: ConditionsDeVieUpdateComponent;
  let fixture: ComponentFixture<ConditionsDeVieUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let conditionsDeVieFormService: ConditionsDeVieFormService;
  let conditionsDeVieService: ConditionsDeVieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ConditionsDeVieUpdateComponent],
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
      .overrideTemplate(ConditionsDeVieUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ConditionsDeVieUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    conditionsDeVieFormService = TestBed.inject(ConditionsDeVieFormService);
    conditionsDeVieService = TestBed.inject(ConditionsDeVieService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const conditionsDeVie: IConditionsDeVie = { id: 456 };

      activatedRoute.data = of({ conditionsDeVie });
      comp.ngOnInit();

      expect(comp.conditionsDeVie).toEqual(conditionsDeVie);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConditionsDeVie>>();
      const conditionsDeVie = { id: 123 };
      jest.spyOn(conditionsDeVieFormService, 'getConditionsDeVie').mockReturnValue(conditionsDeVie);
      jest.spyOn(conditionsDeVieService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ conditionsDeVie });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: conditionsDeVie }));
      saveSubject.complete();

      // THEN
      expect(conditionsDeVieFormService.getConditionsDeVie).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(conditionsDeVieService.update).toHaveBeenCalledWith(expect.objectContaining(conditionsDeVie));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConditionsDeVie>>();
      const conditionsDeVie = { id: 123 };
      jest.spyOn(conditionsDeVieFormService, 'getConditionsDeVie').mockReturnValue({ id: null });
      jest.spyOn(conditionsDeVieService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ conditionsDeVie: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: conditionsDeVie }));
      saveSubject.complete();

      // THEN
      expect(conditionsDeVieFormService.getConditionsDeVie).toHaveBeenCalled();
      expect(conditionsDeVieService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConditionsDeVie>>();
      const conditionsDeVie = { id: 123 };
      jest.spyOn(conditionsDeVieService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ conditionsDeVie });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(conditionsDeVieService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
