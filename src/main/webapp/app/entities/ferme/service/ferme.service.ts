import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFerme, NewFerme } from '../ferme.model';

export type PartialUpdateFerme = Partial<IFerme> & Pick<IFerme, 'id'>;

export type EntityResponseType = HttpResponse<IFerme>;
export type EntityArrayResponseType = HttpResponse<IFerme[]>;

@Injectable({ providedIn: 'root' })
export class FermeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/fermes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(ferme: NewFerme): Observable<EntityResponseType> {
    return this.http.post<IFerme>(this.resourceUrl, ferme, { observe: 'response' });
  }

  update(ferme: IFerme): Observable<EntityResponseType> {
    return this.http.put<IFerme>(`${this.resourceUrl}/${this.getFermeIdentifier(ferme)}`, ferme, { observe: 'response' });
  }

  partialUpdate(ferme: PartialUpdateFerme): Observable<EntityResponseType> {
    return this.http.patch<IFerme>(`${this.resourceUrl}/${this.getFermeIdentifier(ferme)}`, ferme, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFerme>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFerme[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getFermeIdentifier(ferme: Pick<IFerme, 'id'>): number {
    return ferme.id;
  }

  compareFerme(o1: Pick<IFerme, 'id'> | null, o2: Pick<IFerme, 'id'> | null): boolean {
    return o1 && o2 ? this.getFermeIdentifier(o1) === this.getFermeIdentifier(o2) : o1 === o2;
  }

  addFermeToCollectionIfMissing<Type extends Pick<IFerme, 'id'>>(
    fermeCollection: Type[],
    ...fermesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const fermes: Type[] = fermesToCheck.filter(isPresent);
    if (fermes.length > 0) {
      const fermeCollectionIdentifiers = fermeCollection.map(fermeItem => this.getFermeIdentifier(fermeItem)!);
      const fermesToAdd = fermes.filter(fermeItem => {
        const fermeIdentifier = this.getFermeIdentifier(fermeItem);
        if (fermeCollectionIdentifiers.includes(fermeIdentifier)) {
          return false;
        }
        fermeCollectionIdentifiers.push(fermeIdentifier);
        return true;
      });
      return [...fermesToAdd, ...fermeCollection];
    }
    return fermeCollection;
  }
}
