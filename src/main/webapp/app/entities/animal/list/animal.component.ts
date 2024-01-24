import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { combineLatest, filter, Observable, switchMap, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {  IAnimal } from '../animal.model';
import { ASC, DESC, SORT, ITEM_DELETED_EVENT, DEFAULT_SORT_DATA } from 'app/config/navigation.constants';
import { EntityArrayResponseType, AnimalService } from '../service/animal.service';
import { AnimalDeleteDialogComponent } from '../delete/animal-delete-dialog.component';
import { SortService } from 'app/shared/sort/sort.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-animal',
  templateUrl: './animal.component.html',
})
export class AnimalComponent implements OnInit {
  animals?: IAnimal[];
 
filteredAndOrderedAnimals?: IAnimal[];
filter = '';
   
  isLoading = false;
 @Input() ide : number |undefined;
 
  predicate = 'id';
  ascending = true;

  constructor(
    protected animalService: AnimalService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected sortService: SortService,
    protected modalService: NgbModal
  ) {}

  trackId = (_index: number, item: IAnimal): number => this.animalService.getAnimalIdentifier(item);

  ngOnInit(): void {
    this.animalService.query(this.ide).subscribe({
      next: (res: HttpResponse<IAnimal[]>) => {
        this.isLoading = false;
        this.animals = res.body ?? [];
        this.filterAndSort();

      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  
  loadAll(): void {
    this.isLoading = true;
    


    this.animalService.query(this.ide).subscribe({
      next: (res: HttpResponse<IAnimal[]>) => {
        this.isLoading = false;
        this.animals = res.body ?? [];
        this.filterAndSort();

      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  delete(animal: IAnimal): void {
    const modalRef = this.modalService.open(AnimalDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.animal = animal;
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

  filterAndSort(): void {
    this.filteredAndOrderedAnimals = this.animals!.filter(
      animal => !this.filter || animal.genre!.toLowerCase().includes(this.filter.toLowerCase())
      || animal.ref!.toLowerCase().includes(this.filter.toLowerCase())
      || animal.race!.toLowerCase().includes(this.filter.toLowerCase())
      || animal.ref!.toLowerCase().includes(this.filter.toLowerCase())
      || animal.refMere!.toLowerCase().includes(this.filter.toLowerCase())
      || animal.refPere!.toLowerCase().includes(this.filter.toLowerCase())
  
    )
  }

 

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    const sort = (params.get(SORT) ?? data[DEFAULT_SORT_DATA]).split(',');
    this.predicate = sort[0];
    this.ascending = sort[1] === ASC;
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.animals = this.refineData(dataFromBody);
  }

  protected refineData(data: IAnimal[]): IAnimal[] {
    return data.sort(this.sortService.startSort(this.predicate, this.ascending ? 1 : -1));
  }

  protected fillComponentAttributesFromResponseBody(data: IAnimal[] | null): IAnimal[] {
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
