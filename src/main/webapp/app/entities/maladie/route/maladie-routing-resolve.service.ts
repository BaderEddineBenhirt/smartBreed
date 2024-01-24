import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMaladie } from '../maladie.model';
import { MaladieService } from '../service/maladie.service';

@Injectable({ providedIn: 'root' })
export class MaladieRoutingResolveService implements Resolve<IMaladie | null> {
  constructor(protected service: MaladieService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMaladie | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((maladie: HttpResponse<IMaladie>) => {
          if (maladie.body) {
            return of(maladie.body);
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
