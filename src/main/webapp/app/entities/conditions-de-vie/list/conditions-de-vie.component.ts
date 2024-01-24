import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { combineLatest, filter, Observable, switchMap, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IConditionsDeVie } from '../conditions-de-vie.model';
import { ASC, DESC, SORT, ITEM_DELETED_EVENT, DEFAULT_SORT_DATA } from 'app/config/navigation.constants';
import { EntityArrayResponseType, ConditionsDeVieService } from '../service/conditions-de-vie.service';
import { ConditionsDeVieDeleteDialogComponent } from '../delete/conditions-de-vie-delete-dialog.component';
import { SortService } from 'app/shared/sort/sort.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-conditions-de-vie',
  templateUrl: './conditions-de-vie.component.html',
})
export class ConditionsDeVieComponent implements OnInit {
  conditionsDeVies?: IConditionsDeVie[];
  isLoading = false;
  filteredAndOrderedConditionsDeVie?: IConditionsDeVie[];
  filter = '';
  predicate = 'id';
  ascending = true;
  @Input() idC?: number;
  constructor(
    protected conditionsDeVieService: ConditionsDeVieService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected sortService: SortService,
    protected modalService: NgbModal
  ) {}

  trackId = (_index: number, item: IConditionsDeVie): number => this.conditionsDeVieService.getConditionsDeVieIdentifier(item);

  ngOnInit(): void {
    this.conditionsDeVieService.query(this.idC).subscribe({
      next: (res: HttpResponse<IConditionsDeVie[]>) => {
        this.isLoading = false;
        this.conditionsDeVies = res.body ?? [];
 

      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  loadAll(): void {
    this.isLoading = true;

    this.conditionsDeVieService.query().subscribe({
      next: (res: HttpResponse<IConditionsDeVie[]>) => {
        this.isLoading = false;
        this.conditionsDeVies = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  delete(conditionsDeVie: IConditionsDeVie): void {
    const modalRef = this.modalService.open(ConditionsDeVieDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.conditionsDeVie = conditionsDeVie;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
 
 


   
 
  
 
}
