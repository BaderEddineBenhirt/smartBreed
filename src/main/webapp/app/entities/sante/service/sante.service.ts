import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISante, NewSante } from '../sante.model';

export type PartialUpdateSante = Partial<ISante> & Pick<ISante, 'id'>;

export type EntityResponseType = HttpResponse<ISante>;
export type EntityArrayResponseType = HttpResponse<ISante[]>;

@Injectable({ providedIn: 'root' })
export class SanteService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/santes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(sante: NewSante): Observable<EntityResponseType> {
    return this.http.post<ISante>(this.resourceUrl, sante, { observe: 'response' });
  }

  update(sante: ISante): Observable<EntityResponseType> {
    return this.http.put<ISante>(`${this.resourceUrl}/${this.getSanteIdentifier(sante)}`, sante, { observe: 'response' });
  }

  partialUpdate(sante: PartialUpdateSante): Observable<EntityResponseType> {
    return this.http.patch<ISante>(`${this.resourceUrl}/${this.getSanteIdentifier(sante)}`, sante, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISante>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(id?: number): Observable<EntityArrayResponseType> {
    if(id === undefined){
     
      return this.http
        .get<ISante[]>(this.resourceUrl, { observe: 'response' })
        .pipe(map(res => res));
      }else{
        return this.http
          .get<ISante[]>(`${this.resourceUrl}/anime/${id}`, {observe: 'response' })
          .pipe(map(res => res));
      }
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSanteIdentifier(sante: Pick<ISante, 'id'>): number {
    return sante.id;
  }

  compareSante(o1: Pick<ISante, 'id'> | null, o2: Pick<ISante, 'id'> | null): boolean {
    return o1 && o2 ? this.getSanteIdentifier(o1) === this.getSanteIdentifier(o2) : o1 === o2;
  }

  addSanteToCollectionIfMissing<Type extends Pick<ISante, 'id'>>(
    santeCollection: Type[],
    ...santesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const santes: Type[] = santesToCheck.filter(isPresent);
    if (santes.length > 0) {
      const santeCollectionIdentifiers = santeCollection.map(santeItem => this.getSanteIdentifier(santeItem)!);
      const santesToAdd = santes.filter(santeItem => {
        const santeIdentifier = this.getSanteIdentifier(santeItem);
        if (santeCollectionIdentifiers.includes(santeIdentifier)) {
          return false;
        }
        santeCollectionIdentifiers.push(santeIdentifier);
        return true;
      });
      return [...santesToAdd, ...santeCollection];
    }
    return santeCollection;
  }
}
