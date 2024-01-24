import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { MaladieFormService } from './maladie-form.service';
import { MaladieService } from '../service/maladie.service';
import { IMaladie } from '../maladie.model';

import { MaladieUpdateComponent } from './maladie-update.component';

describe('Maladie Management Update Component', () => {
  let comp: MaladieUpdateComponent;
  let fixture: ComponentFixture<MaladieUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let maladieFormService: MaladieFormService;
  let maladieService: MaladieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [MaladieUpdateComponent],
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
      .overrideTemplate(MaladieUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MaladieUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    maladieFormService = TestBed.inject(MaladieFormService);
    maladieService = TestBed.inject(MaladieService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const maladie: IMaladie = { id: 456 };

      activatedRoute.data = of({ maladie });
      comp.ngOnInit();

      expect(comp.maladie).toEqual(maladie);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMaladie>>();
      const maladie = { id: 123 };
      jest.spyOn(maladieFormService, 'getMaladie').mockReturnValue(maladie);
      jest.spyOn(maladieService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ maladie });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: maladie }));
      saveSubject.complete();

      // THEN
      expect(maladieFormService.getMaladie).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(maladieService.update).toHaveBeenCalledWith(expect.objectContaining(maladie));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMaladie>>();
      const maladie = { id: 123 };
      jest.spyOn(maladieFormService, 'getMaladie').mockReturnValue({ id: null });
      jest.spyOn(maladieService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ maladie: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: maladie }));
      saveSubject.complete();

      // THEN
      expect(maladieFormService.getMaladie).toHaveBeenCalled();
      expect(maladieService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMaladie>>();
      const maladie = { id: 123 };
      jest.spyOn(maladieService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ maladie });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(maladieService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
