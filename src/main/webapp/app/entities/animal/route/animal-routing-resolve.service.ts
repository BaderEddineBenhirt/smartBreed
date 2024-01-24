import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAnimal } from '../animal.model';
import { AnimalService } from '../service/animal.service';

@Injectable({ providedIn: 'root' })
export class AnimalRoutingResolveService implements Resolve<IAnimal | null> {
  constructor(protected service: AnimalService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAnimal | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((animal: HttpResponse<IAnimal>) => {
          if (animal.body) {
            return of(animal.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
