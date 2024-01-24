import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMendel, getMendelIdentifier } from '../mendel.model';

export type EntityResponseType = HttpResponse<IMendel>;
export type EntityArrayResponseType = HttpResponse<IMendel[]>;

@Injectable({ providedIn: 'root' })
export class MendelService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/maladies');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(mendel: IMendel): Observable<EntityResponseType> {
    return this.http.post<IMendel>(this.resourceUrl, mendel, { observe: 'response' });
  }

  update(mendel: IMendel): Observable<EntityResponseType> {
    return this.http.put<IMendel>(`${this.resourceUrl}/${getMendelIdentifier(mendel) as number}`, mendel, { observe: 'response' });
  }
  mendel(mendel?: IMendel): Observable<EntityResponseType> {
    return this.http.post<IMendel>(`${this.resourceUrl}/mendel`, mendel, { observe: 'response' });
  }

  partialUpdate(mendel: IMendel): Observable<EntityResponseType> {
    return this.http.patch<IMendel>(`${this.resourceUrl}/${getMendelIdentifier(mendel) as number}`, mendel, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMendel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMendel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addMendelToCollectionIfMissing(mendelCollection: IMendel[], ...mendelToCheck: (IMendel | null | undefined)[]): IMendel[] {
    const maladies: IMendel[] = mendelToCheck.filter(isPresent);
    if (maladies.length > 0) {
      const maladieCollectionIdentifiers = mendelCollection.map(mendelItem => getMendelIdentifier(mendelItem)!);
      const mendelToAdd = maladies.filter(maladieItem => {
        const maladieIdentifier = getMendelIdentifier(maladieItem);
        if (maladieIdentifier == null || maladieCollectionIdentifiers.includes(maladieIdentifier)) {
          return false;
        }
        maladieCollectionIdentifiers.push(maladieIdentifier);
        return true;
      });
      return [...mendelToAdd, ...mendelCollection];
    }
    return mendelCollection;
  }
}
