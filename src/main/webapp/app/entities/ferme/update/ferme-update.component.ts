import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { FermeFormService, FermeFormGroup } from './ferme-form.service';
import { IFerme } from '../ferme.model';
import { FermeService } from '../service/ferme.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';

@Component({
  selector: 'jhi-ferme-update',
  templateUrl: './ferme-update.component.html',
})
export class FermeUpdateComponent implements OnInit {
  isSaving = false;
  ferme: IFerme | null = null;

  usersSharedCollection: IUser[] = [];

  editForm: FermeFormGroup = this.fermeFormService.createFermeFormGroup();

  constructor(
    protected fermeService: FermeService,
    protected fermeFormService: FermeFormService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ferme }) => {
      this.ferme = ferme;
      if (ferme) {
        this.updateForm(ferme);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ferme = this.fermeFormService.getFerme(this.editForm);
    if (ferme.id !== null) {
      this.subscribeToSaveResponse(this.fermeService.update(ferme));
    } else {
      this.subscribeToSaveResponse(this.fermeService.create(ferme));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFerme>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(ferme: IFerme): void {
    this.ferme = ferme;
    this.fermeFormService.resetForm(this.editForm, ferme);

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, ferme.user);
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.ferme?.user)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }
}
