import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMendel, Mendel } from '../mendel.model';
import { MendelService } from '../service/mendel.service';

@Injectable({ providedIn: 'root' })
export class MendelRoutingResolveService implements Resolve<IMendel> {
  constructor(protected service: MendelService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMendel> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((maladie: HttpResponse<IMendel>) => {
          if (maladie.body) {
            return of(maladie.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Mendel());
  }
}
