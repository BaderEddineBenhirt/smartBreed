import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { NutritionFormService } from './nutrition-form.service';
import { NutritionService } from '../service/nutrition.service';
import { INutrition } from '../nutrition.model';
import { IAnimal } from 'app/entities/animal/animal.model';
import { AnimalService } from 'app/entities/animal/service/animal.service';

import { NutritionUpdateComponent } from './nutrition-update.component';

describe('Nutrition Management Update Component', () => {
  let comp: NutritionUpdateComponent;
  let fixture: ComponentFixture<NutritionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let nutritionFormService: NutritionFormService;
  let nutritionService: NutritionService;
  let animalService: AnimalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [NutritionUpdateComponent],
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
      .overrideTemplate(NutritionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NutritionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    nutritionFormService = TestBed.inject(NutritionFormService);
    nutritionService = TestBed.inject(NutritionService);
    animalService = TestBed.inject(AnimalService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Animal query and add missing value', () => {
      const nutrition: INutrition = { id: 456 };
      const animal: IAnimal = { id: 77222 };
      nutrition.animal = animal;

      const animalCollection: IAnimal[] = [{ id: 27898 }];
      jest.spyOn(animalService, 'query').mockReturnValue(of(new HttpResponse({ body: animalCollection })));
      const additionalAnimals = [animal];
      const expectedCollection: IAnimal[] = [...additionalAnimals, ...animalCollection];
      jest.spyOn(animalService, 'addAnimalToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ nutrition });
      comp.ngOnInit();

      expect(animalService.query).toHaveBeenCalled();
      expect(animalService.addAnimalToCollectionIfMissing).toHaveBeenCalledWith(
        animalCollection,
        ...additionalAnimals.map(expect.objectContaining)
      );
      expect(comp.animalsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const nutrition: INutrition = { id: 456 };
      const animal: IAnimal = { id: 33801 };
      nutrition.animal = animal;

      activatedRoute.data = of({ nutrition });
      comp.ngOnInit();

      expect(comp.animalsSharedCollection).toContain(animal);
      expect(comp.nutrition).toEqual(nutrition);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INutrition>>();
      const nutrition = { id: 123 };
      jest.spyOn(nutritionFormService, 'getNutrition').mockReturnValue(nutrition);
      jest.spyOn(nutritionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nutrition });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: nutrition }));
      saveSubject.complete();

      // THEN
      expect(nutritionFormService.getNutrition).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(nutritionService.update).toHaveBeenCalledWith(expect.objectContaining(nutrition));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INutrition>>();
      const nutrition = { id: 123 };
      jest.spyOn(nutritionFormService, 'getNutrition').mockReturnValue({ id: null });
      jest.spyOn(nutritionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nutrition: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: nutrition }));
      saveSubject.complete();

      // THEN
      expect(nutritionFormService.getNutrition).toHaveBeenCalled();
      expect(nutritionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INutrition>>();
      const nutrition = { id: 123 };
      jest.spyOn(nutritionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nutrition });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(nutritionService.update).toHaveBeenCalled();
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
