import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SanteFormService } from './sante-form.service';
import { SanteService } from '../service/sante.service';
import { ISante } from '../sante.model';
import { IMaladie } from 'app/entities/maladie/maladie.model';
import { MaladieService } from 'app/entities/maladie/service/maladie.service';

import { SanteUpdateComponent } from './sante-update.component';

describe('Sante Management Update Component', () => {
  let comp: SanteUpdateComponent;
  let fixture: ComponentFixture<SanteUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let santeFormService: SanteFormService;
  let santeService: SanteService;
  let maladieService: MaladieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SanteUpdateComponent],
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
      .overrideTemplate(SanteUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SanteUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    santeFormService = TestBed.inject(SanteFormService);
    santeService = TestBed.inject(SanteService);
    maladieService = TestBed.inject(MaladieService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Maladie query and add missing value', () => {
      const sante: ISante = { id: 456 };
      const maladie: IMaladie = { id: 69357 };
      sante.maladie = maladie;

      const maladieCollection: IMaladie[] = [{ id: 47170 }];
      jest.spyOn(maladieService, 'query').mockReturnValue(of(new HttpResponse({ body: maladieCollection })));
      const additionalMaladies = [maladie];
      const expectedCollection: IMaladie[] = [...additionalMaladies, ...maladieCollection];
      jest.spyOn(maladieService, 'addMaladieToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ sante });
      comp.ngOnInit();

      expect(maladieService.query).toHaveBeenCalled();
      expect(maladieService.addMaladieToCollectionIfMissing).toHaveBeenCalledWith(
        maladieCollection,
        ...additionalMaladies.map(expect.objectContaining)
      );
      expect(comp.maladiesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const sante: ISante = { id: 456 };
      const maladie: IMaladie = { id: 85714 };
      sante.maladie = maladie;

      activatedRoute.data = of({ sante });
      comp.ngOnInit();

      expect(comp.maladiesSharedCollection).toContain(maladie);
      expect(comp.sante).toEqual(sante);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISante>>();
      const sante = { id: 123 };
      jest.spyOn(santeFormService, 'getSante').mockReturnValue(sante);
      jest.spyOn(santeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sante });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: sante }));
      saveSubject.complete();

      // THEN
      expect(santeFormService.getSante).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(santeService.update).toHaveBeenCalledWith(expect.objectContaining(sante));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISante>>();
      const sante = { id: 123 };
      jest.spyOn(santeFormService, 'getSante').mockReturnValue({ id: null });
      jest.spyOn(santeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sante: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: sante }));
      saveSubject.complete();

      // THEN
      expect(santeFormService.getSante).toHaveBeenCalled();
      expect(santeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISante>>();
      const sante = { id: 123 };
      jest.spyOn(santeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sante });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(santeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareMaladie', () => {
      it('Should forward to maladieService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(maladieService, 'compareMaladie');
        comp.compareMaladie(entity, entity2);
        expect(maladieService.compareMaladie).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
