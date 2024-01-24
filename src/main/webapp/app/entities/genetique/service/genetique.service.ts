import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IGenetique, NewGenetique } from '../genetique.model';
import dayjs from 'dayjs';

export type PartialUpdateGenetique = Partial<IGenetique> & Pick<IGenetique, 'id'>;

export type EntityResponseType = HttpResponse<IGenetique>;
export type EntityArrayResponseType = HttpResponse<IGenetique[]>;

@Injectable({ providedIn: 'root' })
export class GenetiqueService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/genetiques');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(genetique: NewGenetique): Observable<EntityResponseType> {
    return this.http.post<IGenetique>(this.resourceUrl, genetique, { observe: 'response' });
  }

  update(genetique: IGenetique): Observable<EntityResponseType> {
    return this.http.put<IGenetique>(`${this.resourceUrl}/${this.getGenetiqueIdentifier(genetique)}`, genetique, { observe: 'response' });
  }

  partialUpdate(genetique: PartialUpdateGenetique): Observable<EntityResponseType> {
    return this.http.patch<IGenetique>(`${this.resourceUrl}/${this.getGenetiqueIdentifier(genetique)}`, genetique, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGenetique>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(id?: number): Observable<EntityArrayResponseType> {
    if(id === undefined){
     
      return this.http
        .get<IGenetique[]>(this.resourceUrl, { observe: 'response' })
        .pipe(map(res => this.convertResponseArrayFromServer(res)));
      }else{
        return this.http
          .get<IGenetique[]>(`${this.resourceUrl}/anime/${id}`, {observe: 'response' })
          .pipe(map(res => this.convertResponseArrayFromServer(res)));
      }
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getGenetiqueIdentifier(genetique: Pick<IGenetique, 'id'>): number {
    return genetique.id;
  }

  compareGenetique(o1: Pick<IGenetique, 'id'> | null, o2: Pick<IGenetique, 'id'> | null): boolean {
    return o1 && o2 ? this.getGenetiqueIdentifier(o1) === this.getGenetiqueIdentifier(o2) : o1 === o2;
  }

  addGenetiqueToCollectionIfMissing<Type extends Pick<IGenetique, 'id'>>(
    genetiqueCollection: Type[],
    ...genetiquesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const genetiques: Type[] = genetiquesToCheck.filter(isPresent);
    if (genetiques.length > 0) {
      const genetiqueCollectionIdentifiers = genetiqueCollection.map(genetiqueItem => this.getGenetiqueIdentifier(genetiqueItem)!);
      const genetiquesToAdd = genetiques.filter(genetiqueItem => {
        const genetiqueIdentifier = this.getGenetiqueIdentifier(genetiqueItem);
        if (genetiqueCollectionIdentifiers.includes(genetiqueIdentifier)) {
          return false;
        }
        genetiqueCollectionIdentifiers.push(genetiqueIdentifier);
        return true;
      });
      return [...genetiquesToAdd, ...genetiqueCollection];
    }
    return genetiqueCollection;
  }

  protected convertResponseArrayFromServer(res: HttpResponse<IGenetique[]>): HttpResponse<IGenetique[]> {
    return res.clone({
      body: res.body ? res.body.map(item => item) : null,
    });
  }
  
  
}
