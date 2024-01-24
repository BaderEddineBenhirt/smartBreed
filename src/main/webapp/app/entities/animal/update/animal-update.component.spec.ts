import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AnimalFormService } from './animal-form.service';
import { AnimalService } from '../service/animal.service';
import { IAnimal } from '../animal.model';
import { IGenetique } from 'app/entities/genetique/genetique.model';
import { GenetiqueService } from 'app/entities/genetique/service/genetique.service';
import { IConditionsDeVie } from 'app/entities/conditions-de-vie/conditions-de-vie.model';
import { ConditionsDeVieService } from 'app/entities/conditions-de-vie/service/conditions-de-vie.service';
import { IMaladie } from 'app/entities/maladie/maladie.model';
import { MaladieService } from 'app/entities/maladie/service/maladie.service';
import { IFerme } from 'app/entities/ferme/ferme.model';
import { FermeService } from 'app/entities/ferme/service/ferme.service';

import { AnimalUpdateComponent } from './animal-update.component';

describe('Animal Management Update Component', () => {
  let comp: AnimalUpdateComponent;
  let fixture: ComponentFixture<AnimalUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let animalFormService: AnimalFormService;
  let animalService: AnimalService;
  let genetiqueService: GenetiqueService;
  let conditionsDeVieService: ConditionsDeVieService;
  let maladieService: MaladieService;
  let fermeService: FermeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AnimalUpdateComponent],
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
      .overrideTemplate(AnimalUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AnimalUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    animalFormService = TestBed.inject(AnimalFormService);
    animalService = TestBed.inject(AnimalService);
    genetiqueService = TestBed.inject(GenetiqueService);
    conditionsDeVieService = TestBed.inject(ConditionsDeVieService);
    maladieService = TestBed.inject(MaladieService);
    fermeService = TestBed.inject(FermeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call genetique query and add missing value', () => {
      const animal: IAnimal = { id: 456 };
      const genetique: IGenetique = { id: 34490 };
      animal.genetique = genetique;

      const genetiqueCollection: IGenetique[] = [{ id: 20578 }];
      jest.spyOn(genetiqueService, 'query').mockReturnValue(of(new HttpResponse({ body: genetiqueCollection })));
      const expectedCollection: IGenetique[] = [genetique, ...genetiqueCollection];
      jest.spyOn(genetiqueService, 'addGenetiqueToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ animal });
      comp.ngOnInit();

      expect(genetiqueService.query).toHaveBeenCalled();
      expect(genetiqueService.addGenetiqueToCollectionIfMissing).toHaveBeenCalledWith(genetiqueCollection, genetique);
      expect(comp.genetiquesCollection).toEqual(expectedCollection);
    });

    it('Should call ConditionsDeVie query and add missing value', () => {
      const animal: IAnimal = { id: 456 };
      const conditionsDeVie: IConditionsDeVie = { id: 44562 };
      animal.conditionsDeVie = conditionsDeVie;

      const conditionsDeVieCollection: IConditionsDeVie[] = [{ id: 44016 }];
      jest.spyOn(conditionsDeVieService, 'query').mockReturnValue(of(new HttpResponse({ body: conditionsDeVieCollection })));
      const additionalConditionsDeVies = [conditionsDeVie];
      const expectedCollection: IConditionsDeVie[] = [...additionalConditionsDeVies, ...conditionsDeVieCollection];
      jest.spyOn(conditionsDeVieService, 'addConditionsDeVieToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ animal });
      comp.ngOnInit();

      expect(conditionsDeVieService.query).toHaveBeenCalled();
      expect(conditionsDeVieService.addConditionsDeVieToCollectionIfMissing).toHaveBeenCalledWith(
        conditionsDeVieCollection,
        ...additionalConditionsDeVies.map(expect.objectContaining)
      );
      expect(comp.conditionsDeViesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Maladie query and add missing value', () => {
      const animal: IAnimal = { id: 456 };
      const maladies: IMaladie[] = [{ id: 57422 }];
      animal.maladies = maladies;

      const maladieCollection: IMaladie[] = [{ id: 93783 }];
      jest.spyOn(maladieService, 'query').mockReturnValue(of(new HttpResponse({ body: maladieCollection })));
      const additionalMaladies = [...maladies];
      const expectedCollection: IMaladie[] = [...additionalMaladies, ...maladieCollection];
      jest.spyOn(maladieService, 'addMaladieToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ animal });
      comp.ngOnInit();

      expect(maladieService.query).toHaveBeenCalled();
      expect(maladieService.addMaladieToCollectionIfMissing).toHaveBeenCalledWith(
        maladieCollection,
        ...additionalMaladies.map(expect.objectContaining)
      );
      expect(comp.maladiesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Ferme query and add missing value', () => {
      const animal: IAnimal = { id: 456 };
      const ferme: IFerme = { id: 73341 };
      animal.ferme = ferme;

      const fermeCollection: IFerme[] = [{ id: 20338 }];
      jest.spyOn(fermeService, 'query').mockReturnValue(of(new HttpResponse({ body: fermeCollection })));
      const additionalFermes = [ferme];
      const expectedCollection: IFerme[] = [...additionalFermes, ...fermeCollection];
      jest.spyOn(fermeService, 'addFermeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ animal });
      comp.ngOnInit();

      expect(fermeService.query).toHaveBeenCalled();
      expect(fermeService.addFermeToCollectionIfMissing).toHaveBeenCalledWith(
        fermeCollection,
        ...additionalFermes.map(expect.objectContaining)
      );
      expect(comp.fermesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const animal: IAnimal = { id: 456 };
      const genetique: IGenetique = { id: 36083 };
      animal.genetique = genetique;
      const conditionsDeVie: IConditionsDeVie = { id: 1948 };
      animal.conditionsDeVie = conditionsDeVie;
      const maladie: IMaladie = { id: 70587 };
      animal.maladies = [maladie];
      const ferme: IFerme = { id: 20413 };
      animal.ferme = ferme;

      activatedRoute.data = of({ animal });
      comp.ngOnInit();

      expect(comp.genetiquesCollection).toContain(genetique);
      expect(comp.conditionsDeViesSharedCollection).toContain(conditionsDeVie);
      expect(comp.maladiesSharedCollection).toContain(maladie);
      expect(comp.fermesSharedCollection).toContain(ferme);
      expect(comp.animal).toEqual(animal);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAnimal>>();
      const animal = { id: 123 };
      jest.spyOn(animalFormService, 'getAnimal').mockReturnValue(animal);
      jest.spyOn(animalService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ animal });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: animal }));
      saveSubject.complete();

      // THEN
      expect(animalFormService.getAnimal).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(animalService.update).toHaveBeenCalledWith(expect.objectContaining(animal));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAnimal>>();
      const animal = { id: 123 };
      jest.spyOn(animalFormService, 'getAnimal').mockReturnValue({ id: null });
      jest.spyOn(animalService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ animal: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: animal }));
      saveSubject.complete();

      // THEN
      expect(animalFormService.getAnimal).toHaveBeenCalled();
      expect(animalService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAnimal>>();
      const animal = { id: 123 };
      jest.spyOn(animalService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ animal });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(animalService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareGenetique', () => {
      it('Should forward to genetiqueService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(genetiqueService, 'compareGenetique');
        comp.compareGenetique(entity, entity2);
        expect(genetiqueService.compareGenetique).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareConditionsDeVie', () => {
      it('Should forward to conditionsDeVieService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(conditionsDeVieService, 'compareConditionsDeVie');
        comp.compareConditionsDeVie(entity, entity2);
        expect(conditionsDeVieService.compareConditionsDeVie).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareMaladie', () => {
      it('Should forward to maladieService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(maladieService, 'compareMaladie');
        comp.compareMaladie(entity, entity2);
        expect(maladieService.compareMaladie).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareFerme', () => {
      it('Should forward to fermeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(fermeService, 'compareFerme');
        comp.compareFerme(entity, entity2);
        expect(fermeService.compareFerme).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
