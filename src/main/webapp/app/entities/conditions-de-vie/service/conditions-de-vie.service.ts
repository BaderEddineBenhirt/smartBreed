import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IConditionsDeVie, NewConditionsDeVie } from '../conditions-de-vie.model';

export type PartialUpdateConditionsDeVie = Partial<IConditionsDeVie> & Pick<IConditionsDeVie, 'id'>;

export type EntityResponseType = HttpResponse<IConditionsDeVie>;
export type EntityArrayResponseType = HttpResponse<IConditionsDeVie[]>;

@Injectable({ providedIn: 'root' })
export class ConditionsDeVieService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/conditions-de-vies');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(conditionsDeVie: NewConditionsDeVie): Observable<EntityResponseType> {
    return this.http.post<IConditionsDeVie>(this.resourceUrl, conditionsDeVie, { observe: 'response' });
  }

  update(conditionsDeVie: IConditionsDeVie): Observable<EntityResponseType> {
    return this.http.put<IConditionsDeVie>(`${this.resourceUrl}/${this.getConditionsDeVieIdentifier(conditionsDeVie)}`, conditionsDeVie, {
      observe: 'response',
    });
  }

  partialUpdate(conditionsDeVie: PartialUpdateConditionsDeVie): Observable<EntityResponseType> {
    return this.http.patch<IConditionsDeVie>(`${this.resourceUrl}/${this.getConditionsDeVieIdentifier(conditionsDeVie)}`, conditionsDeVie, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IConditionsDeVie>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(id?: number): Observable<EntityArrayResponseType> {
    if(id === undefined){
     
      return this.http
        .get<IConditionsDeVie[]>(this.resourceUrl, { observe: 'response' })
        .pipe(map(res => this.convertResponseArrayFromServer(res)));
      }else{
        return this.http
          .get<IConditionsDeVie[]>(`${this.resourceUrl}/anime/${id}`, {observe: 'response' })
          .pipe(map(res => this.convertResponseArrayFromServer(res)));
      }
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getConditionsDeVieIdentifier(conditionsDeVie: Pick<IConditionsDeVie, 'id'>): number {
    return conditionsDeVie.id;
  }

  compareConditionsDeVie(o1: Pick<IConditionsDeVie, 'id'> | null, o2: Pick<IConditionsDeVie, 'id'> | null): boolean {
    return o1 && o2 ? this.getConditionsDeVieIdentifier(o1) === this.getConditionsDeVieIdentifier(o2) : o1 === o2;
  }

  addConditionsDeVieToCollectionIfMissing<Type extends Pick<IConditionsDeVie, 'id'>>(
    conditionsDeVieCollection: Type[],
    ...conditionsDeViesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const conditionsDeVies: Type[] = conditionsDeViesToCheck.filter(isPresent);
    if (conditionsDeVies.length > 0) {
      const conditionsDeVieCollectionIdentifiers = conditionsDeVieCollection.map(
        conditionsDeVieItem => this.getConditionsDeVieIdentifier(conditionsDeVieItem)!
      );
      const conditionsDeViesToAdd = conditionsDeVies.filter(conditionsDeVieItem => {
        const conditionsDeVieIdentifier = this.getConditionsDeVieIdentifier(conditionsDeVieItem);
        if (conditionsDeVieCollectionIdentifiers.includes(conditionsDeVieIdentifier)) {
          return false;
        }
        conditionsDeVieCollectionIdentifiers.push(conditionsDeVieIdentifier);
        return true;
      });
      return [...conditionsDeViesToAdd, ...conditionsDeVieCollection];
    }
    return conditionsDeVieCollection;
  }
  protected convertResponseArrayFromServer(res: HttpResponse<IConditionsDeVie[]>): HttpResponse<IConditionsDeVie[]> {
    return res.clone({
      body: res.body ? res.body.map(item =>  item) : null,
    });
  }
}
