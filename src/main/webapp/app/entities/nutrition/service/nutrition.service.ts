import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { INutrition, NewNutrition } from '../nutrition.model';

export type PartialUpdateNutrition = Partial<INutrition> & Pick<INutrition, 'id'>;

export type EntityResponseType = HttpResponse<INutrition>;
export type EntityArrayResponseType = HttpResponse<INutrition[]>;

@Injectable({ providedIn: 'root' })
export class NutritionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/nutritions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(nutrition: NewNutrition): Observable<EntityResponseType> {
    return this.http.post<INutrition>(this.resourceUrl, nutrition, { observe: 'response' });
  }

  update(nutrition: INutrition): Observable<EntityResponseType> {
    return this.http.put<INutrition>(`${this.resourceUrl}/${this.getNutritionIdentifier(nutrition)}`, nutrition, { observe: 'response' });
  }

  partialUpdate(nutrition: PartialUpdateNutrition): Observable<EntityResponseType> {
    return this.http.patch<INutrition>(`${this.resourceUrl}/${this.getNutritionIdentifier(nutrition)}`, nutrition, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INutrition>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(id?: number): Observable<EntityArrayResponseType> {
    if(id === undefined){
     
      return this.http
        .get<INutrition[]>(this.resourceUrl, { observe: 'response' })
        .pipe(map(res => res));
      }else{
        return this.http
          .get<INutrition[]>(`${this.resourceUrl}/anime/${id}`, {observe: 'response' })
          .pipe(map(res => res));
      }
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getNutritionIdentifier(nutrition: Pick<INutrition, 'id'>): number {
    return nutrition.id;
  }

  compareNutrition(o1: Pick<INutrition, 'id'> | null, o2: Pick<INutrition, 'id'> | null): boolean {
    return o1 && o2 ? this.getNutritionIdentifier(o1) === this.getNutritionIdentifier(o2) : o1 === o2;
  }

  addNutritionToCollectionIfMissing<Type extends Pick<INutrition, 'id'>>(
    nutritionCollection: Type[],
    ...nutritionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const nutritions: Type[] = nutritionsToCheck.filter(isPresent);
    if (nutritions.length > 0) {
      const nutritionCollectionIdentifiers = nutritionCollection.map(nutritionItem => this.getNutritionIdentifier(nutritionItem)!);
      const nutritionsToAdd = nutritions.filter(nutritionItem => {
        const nutritionIdentifier = this.getNutritionIdentifier(nutritionItem);
        if (nutritionCollectionIdentifiers.includes(nutritionIdentifier)) {
          return false;
        }
        nutritionCollectionIdentifiers.push(nutritionIdentifier);
        return true;
      });
      return [...nutritionsToAdd, ...nutritionCollection];
    }
    return nutritionCollection;
  }
}
