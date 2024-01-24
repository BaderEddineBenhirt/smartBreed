import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { combineLatest, filter, Observable, switchMap, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMaladie } from '../maladie.model';
import { ASC, DESC, SORT, ITEM_DELETED_EVENT, DEFAULT_SORT_DATA } from 'app/config/navigation.constants';
import { EntityArrayResponseType, MaladieService } from '../service/maladie.service';
import { MaladieDeleteDialogComponent } from '../delete/maladie-delete-dialog.component';
import { SortService } from 'app/shared/sort/sort.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-maladie',
  templateUrl: './maladie.component.html',
})
export class MaladieComponent implements OnInit {
 
  maladies?: IMaladie[]   ;
  mzn?: IMaladie[]    ;
  maladiesContainer?: IMaladie[];
  isLoading = false;
  table: HTMLTableElement | undefined;
    thead: HTMLElement | undefined;
    tbody: HTMLElement | undefined;
    public chartData: Array<any> = [];
  
@Input() idm? : IMaladie[] | any 
  predicate = 'id';
  ascending = true;
  constructor(
    protected maladieService: MaladieService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected sortService: SortService,
    protected modalService: NgbModal
  ) {}

  trackId = (_index: number, item: IMaladie): number => this.maladieService.getMaladieIdentifier(item);

  ngOnInit(): void {
    this.loadAll();
   
  }
  loadAll(): void {
    
 
    
    
  
      this.isLoading = true;
       
      this.maladieService.query( ).subscribe({
        next: (res: HttpResponse<IMaladie[]>) => {
          this.isLoading = false;
            
            if(this.idm !== null && this.idm !== undefined){
              for(let i = 0 ; i < this.idm?.length; i++){
               
                 this.maladies = this.idm;
              
              }
            }else{
              this.maladies = res.body ?? [];
            
            }
         
          
        },
        error: () => {
          this.isLoading = false;
        },
      });
     
   
   
    
  
    
  }
  


  delete(maladie: IMaladie): void {
    const modalRef = this.modalService.open(MaladieDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.maladie = maladie;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
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
    this.maladies = this.refineData(dataFromBody);
  }

  protected refineData(data: IMaladie[]): IMaladie[] {
    return data.sort(this.sortService.startSort(this.predicate, this.ascending ? 1 : -1));
  }

  protected fillComponentAttributesFromResponseBody(data: IMaladie[] | null): IMaladie[] {
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
