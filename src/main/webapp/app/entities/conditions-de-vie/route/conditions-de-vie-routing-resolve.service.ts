import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IConditionsDeVie } from '../conditions-de-vie.model';
import { ConditionsDeVieService } from '../service/conditions-de-vie.service';

@Injectable({ providedIn: 'root' })
export class ConditionsDeVieRoutingResolveService implements Resolve<IConditionsDeVie | null> {
  constructor(protected service: ConditionsDeVieService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConditionsDeVie | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((conditionsDeVie: HttpResponse<IConditionsDeVie>) => {
          if (conditionsDeVie.body) {
            return of(conditionsDeVie.body);
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
