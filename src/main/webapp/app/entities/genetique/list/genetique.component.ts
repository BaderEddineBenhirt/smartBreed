import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { combineLatest, filter, Observable, switchMap, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGenetique } from '../genetique.model';
import { ASC, DESC, SORT, ITEM_DELETED_EVENT, DEFAULT_SORT_DATA } from 'app/config/navigation.constants';
import { EntityArrayResponseType, GenetiqueService } from '../service/genetique.service';
import { GenetiqueDeleteDialogComponent } from '../delete/genetique-delete-dialog.component';
import { SortService } from 'app/shared/sort/sort.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-genetique',
  templateUrl: './genetique.component.html',
})
export class GenetiqueComponent implements OnInit {
  genetiques?: IGenetique[];
  isLoading = false;
@Input () idg?:number;
  predicate = 'id';
  ascending = true;

  constructor(
    protected genetiqueService: GenetiqueService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected sortService: SortService,
    protected modalService: NgbModal
  ) {}

  trackId = (_index: number, item: IGenetique): number => this.genetiqueService.getGenetiqueIdentifier(item);

  ngOnInit(): void {
    this.loadAll();
  }

  delete(genetique: IGenetique): void {
    const modalRef = this.modalService.open(GenetiqueDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.genetique = genetique;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }

  loadAll(): void {
    this.isLoading = true;

    this.genetiqueService.query(this.idg).subscribe({
      next: (res: HttpResponse<IGenetique[]>) => {
        this.isLoading = false;
        this.genetiques = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  navigateToWithComponentValues(): void {
    this.handleNavigation(this.predicate, this.ascending);
  }

   

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    const sort = (params.get(SORT) ?? data[DEFAULT_SORT_DATA]).split(',');
    this.predicate = sort[0];
    this.ascending = sort[1] === ASC;
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.genetiques = this.refineData(dataFromBody);
  }

  protected refineData(data: IGenetique[]): IGenetique[] {
    return data.sort(this.sortService.startSort(this.predicate, this.ascending ? 1 : -1));
  }

  protected fillComponentAttributesFromResponseBody(data: IGenetique[] | null): IGenetique[] {
    return data ?? [];
  }
 

  protected handleNavigation(predicate?: string, ascending?: boolean): void {
    const queryParamsObj = {
      sort: this.getSortQueryParam(predicate, ascending),
    };

    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      queryParams: queryParamsObj,
    });
  }

  protected getSortQueryParam(predicate = this.predicate, ascending = this.ascending): string[] {
    const ascendingQueryParam = ascending ? ASC : DESC;
    if (predicate === '') {
      return [];
    } else {
      return [predicate + ',' + ascendingQueryParam];
    }
  }
}
