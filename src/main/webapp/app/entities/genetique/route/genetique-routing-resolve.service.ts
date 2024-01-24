import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IGenetique } from '../genetique.model';
import { GenetiqueService } from '../service/genetique.service';

@Injectable({ providedIn: 'root' })
export class GenetiqueRoutingResolveService implements Resolve<IGenetique | null> {
  constructor(protected service: GenetiqueService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGenetique | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((genetique: HttpResponse<IGenetique>) => {
          if (genetique.body) {
            return of(genetique.body);
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
