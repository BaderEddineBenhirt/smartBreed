import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import dayjs from 'dayjs/esm';
import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMaladie, NewMaladie } from '../maladie.model';

export type PartialUpdateMaladie = Partial<IMaladie> & Pick<IMaladie, 'id'>;

export type EntityResponseType = HttpResponse<IMaladie>;
export type EntityArrayResponseType = HttpResponse<IMaladie[]>;

@Injectable({ providedIn: 'root' })
export class MaladieService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/maladies');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(maladie: NewMaladie): Observable<EntityResponseType> {
    return this.http.post<IMaladie>(this.resourceUrl, maladie, { observe: 'response' });
  }

  update(maladie: IMaladie): Observable<EntityResponseType> {
    return this.http.put<IMaladie>(`${this.resourceUrl}/${this.getMaladieIdentifier(maladie)}`, maladie, { observe: 'response' });
  }

  partialUpdate(maladie: PartialUpdateMaladie): Observable<EntityResponseType> {
    return this.http.patch<IMaladie>(`${this.resourceUrl}/${this.getMaladieIdentifier(maladie)}`, maladie, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMaladie>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(id?: number): Observable<EntityArrayResponseType> {
    if(id === undefined){
     
      return this.http
        .get<IMaladie[]>(this.resourceUrl, { observe: 'response' })
        .pipe(map(res => this.convertResponseArrayFromServer(res)));
      }else{
        return this.http
          .get<IMaladie[]>(`${this.resourceUrl}/anime/${id}`, {observe: 'response' })
          .pipe(map(res => this.convertResponseArrayFromServer(res)));
      }

    
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getMaladieIdentifier(maladie: Pick<IMaladie, 'id'>): number {
    return maladie.id;
  }

  compareMaladie(o1: Pick<IMaladie, 'id'> | null, o2: Pick<IMaladie, 'id'> | null): boolean {
    return o1 && o2 ? this.getMaladieIdentifier(o1) === this.getMaladieIdentifier(o2) : o1 === o2;
  }

  addMaladieToCollectionIfMissing<Type extends Pick<IMaladie, 'id'>>(
    maladieCollection: Type[],
    ...maladiesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const maladies: Type[] = maladiesToCheck.filter(isPresent);
    if (maladies.length > 0) {
      const maladieCollectionIdentifiers = maladieCollection.map(maladieItem => this.getMaladieIdentifier(maladieItem)!);
      const maladiesToAdd = maladies.filter(maladieItem => {
        const maladieIdentifier = this.getMaladieIdentifier(maladieItem);
        if (maladieCollectionIdentifiers.includes(maladieIdentifier)) {
          return false;
        }
        maladieCollectionIdentifiers.push(maladieIdentifier);
        return true;
      });
      return [...maladiesToAdd, ...maladieCollection];
    }
    return maladieCollection;
  }
   
  protected convertResponseArrayFromServer(res: HttpResponse<IMaladie[]>): HttpResponse<IMaladie[]> {
    return res.clone({
      body: res.body ? res.body.map(item =>  item) : null,
    });
  }
}
