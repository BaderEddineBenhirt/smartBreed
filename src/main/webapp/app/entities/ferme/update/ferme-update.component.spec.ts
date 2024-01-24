import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FermeFormService } from './ferme-form.service';
import { FermeService } from '../service/ferme.service';
import { IFerme } from '../ferme.model';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';

import { FermeUpdateComponent } from './ferme-update.component';

describe('Ferme Management Update Component', () => {
  let comp: FermeUpdateComponent;
  let fixture: ComponentFixture<FermeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fermeFormService: FermeFormService;
  let fermeService: FermeService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FermeUpdateComponent],
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
      .overrideTemplate(FermeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FermeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fermeFormService = TestBed.inject(FermeFormService);
    fermeService = TestBed.inject(FermeService);
    userService = TestBed.inject(UserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call User query and add missing value', () => {
      const ferme: IFerme = { id: 456 };
      const user: IUser = { id: 63095 };
      ferme.user = user;

      const userCollection: IUser[] = [{ id: 55529 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [user];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ ferme });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(
        userCollection,
        ...additionalUsers.map(expect.objectContaining)
      );
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const ferme: IFerme = { id: 456 };
      const user: IUser = { id: 53211 };
      ferme.user = user;

      activatedRoute.data = of({ ferme });
      comp.ngOnInit();

      expect(comp.usersSharedCollection).toContain(user);
      expect(comp.ferme).toEqual(ferme);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFerme>>();
      const ferme = { id: 123 };
      jest.spyOn(fermeFormService, 'getFerme').mockReturnValue(ferme);
      jest.spyOn(fermeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ferme });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ferme }));
      saveSubject.complete();

      // THEN
      expect(fermeFormService.getFerme).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(fermeService.update).toHaveBeenCalledWith(expect.objectContaining(ferme));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFerme>>();
      const ferme = { id: 123 };
      jest.spyOn(fermeFormService, 'getFerme').mockReturnValue({ id: null });
      jest.spyOn(fermeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ferme: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ferme }));
      saveSubject.complete();

      // THEN
      expect(fermeFormService.getFerme).toHaveBeenCalled();
      expect(fermeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFerme>>();
      const ferme = { id: 123 };
      jest.spyOn(fermeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ferme });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fermeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareUser', () => {
      it('Should forward to userService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(userService, 'compareUser');
        comp.compareUser(entity, entity2);
        expect(userService.compareUser).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
