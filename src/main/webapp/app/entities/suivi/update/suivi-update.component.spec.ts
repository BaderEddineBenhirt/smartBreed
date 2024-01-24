import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SuiviFormService } from './suivi-form.service';
import { SuiviService } from '../service/suivi.service';
import { ISuivi } from '../suivi.model';
import { IAnimal } from 'app/entities/animal/animal.model';
import { AnimalService } from 'app/entities/animal/service/animal.service';

import { SuiviUpdateComponent } from './suivi-update.component';

describe('Suivi Management Update Component', () => {
  let comp: SuiviUpdateComponent;
  let fixture: ComponentFixture<SuiviUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let suiviFormService: SuiviFormService;
  let suiviService: SuiviService;
  let animalService: AnimalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SuiviUpdateComponent],
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
      .overrideTemplate(SuiviUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SuiviUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    suiviFormService = TestBed.inject(SuiviFormService);
    suiviService = TestBed.inject(SuiviService);
    animalService = TestBed.inject(AnimalService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Animal query and add missing value', () => {
      const suivi: ISuivi = { id: 456 };
      const animal: IAnimal = { id: 3184 };
      suivi.animal = animal;

      const animalCollection: IAnimal[] = [{ id: 23256 }];
      jest.spyOn(animalService, 'query').mockReturnValue(of(new HttpResponse({ body: animalCollection })));
      const additionalAnimals = [animal];
      const expectedCollection: IAnimal[] = [...additionalAnimals, ...animalCollection];
      jest.spyOn(animalService, 'addAnimalToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ suivi });
      comp.ngOnInit();

      expect(animalService.query).toHaveBeenCalled();
      expect(animalService.addAnimalToCollectionIfMissing).toHaveBeenCalledWith(
        animalCollection,
        ...additionalAnimals.map(expect.objectContaining)
      );
      expect(comp.animalsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const suivi: ISuivi = { id: 456 };
      const animal: IAnimal = { id: 32260 };
      suivi.animal = animal;

      activatedRoute.data = of({ suivi });
      comp.ngOnInit();

      expect(comp.animalsSharedCollection).toContain(animal);
      expect(comp.suivi).toEqual(suivi);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISuivi>>();
      const suivi = { id: 123 };
      jest.spyOn(suiviFormService, 'getSuivi').mockReturnValue(suivi);
      jest.spyOn(suiviService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ suivi });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: suivi }));
      saveSubject.complete();

      // THEN
      expect(suiviFormService.getSuivi).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(suiviService.update).toHaveBeenCalledWith(expect.objectContaining(suivi));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISuivi>>();
      const suivi = { id: 123 };
      jest.spyOn(suiviFormService, 'getSuivi').mockReturnValue({ id: null });
      jest.spyOn(suiviService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ suivi: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: suivi }));
      saveSubject.complete();

      // THEN
      expect(suiviFormService.getSuivi).toHaveBeenCalled();
      expect(suiviService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISuivi>>();
      const suivi = { id: 123 };
      jest.spyOn(suiviService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ suivi });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(suiviService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareAnimal', () => {
      it('Should forward to animalService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(animalService, 'compareAnimal');
        comp.compareAnimal(entity, entity2);
        expect(animalService.compareAnimal).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
