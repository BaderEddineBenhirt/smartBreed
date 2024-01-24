import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAnimal, NewAnimal } from '../animal.model';

export type PartialUpdateAnimal = Partial<IAnimal> & Pick<IAnimal, 'id'>;

type RestOf<T extends IAnimal | NewAnimal> = Omit<T, 'age'> & {
  age?: string | null;
};

export type RestAnimal = RestOf<IAnimal>;

export type NewRestAnimal = RestOf<NewAnimal>;

export type PartialUpdateRestAnimal = RestOf<PartialUpdateAnimal>;

export type EntityResponseType = HttpResponse<IAnimal>;
export type EntityArrayResponseType = HttpResponse<IAnimal[]>;

@Injectable({ providedIn: 'root' })
export class AnimalService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/animals');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(animal: NewAnimal): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(animal);
    return this.http
      .post<RestAnimal>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(animal: IAnimal): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(animal);
    return this.http
      .put<RestAnimal>(`${this.resourceUrl}/${this.getAnimalIdentifier(animal)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(animal: PartialUpdateAnimal): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(animal);
    return this.http
      .patch<RestAnimal>(`${this.resourceUrl}/${this.getAnimalIdentifier(animal)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestAnimal>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(id?: number): Observable<EntityArrayResponseType> {
    if(id === undefined){
     
    return this.http
      .get<RestAnimal[]>(this.resourceUrl, { observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
    }else{
      return this.http
        .get<RestAnimal[]>(`${this.resourceUrl}/anime/${id}`, {observe: 'response' })
        .pipe(map(res => this.convertResponseArrayFromServer(res)));
    }
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAnimalIdentifier(animal: Pick<IAnimal, 'id'>): number {
    return animal.id;
  }

  compareAnimal(o1: Pick<IAnimal, 'id'> | null, o2: Pick<IAnimal, 'id'> | null): boolean {
    return o1 && o2 ? this.getAnimalIdentifier(o1) === this.getAnimalIdentifier(o2) : o1 === o2;
  }

  addAnimalToCollectionIfMissing<Type extends Pick<IAnimal, 'id'>>(
    animalCollection: Type[],
    ...animalsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const animals: Type[] = animalsToCheck.filter(isPresent);
    if (animals.length > 0) {
      const animalCollectionIdentifiers = animalCollection.map(animalItem => this.getAnimalIdentifier(animalItem)!);
      const animalsToAdd = animals.filter(animalItem => {
        const animalIdentifier = this.getAnimalIdentifier(animalItem);
        if (animalCollectionIdentifiers.includes(animalIdentifier)) {
          return false;
        }
        animalCollectionIdentifiers.push(animalIdentifier);
        return true;
      });
      return [...animalsToAdd, ...animalCollection];
    }
    return animalCollection;
  }

  protected convertDateFromClient<T extends IAnimal | NewAnimal | PartialUpdateAnimal>(animal: T): RestOf<T> {
    return {
      ...animal,
      age: animal.age?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restAnimal: RestAnimal): IAnimal {
    return {
      ...restAnimal,
      age: restAnimal.age ? dayjs(restAnimal.age) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestAnimal>): HttpResponse<IAnimal> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestAnimal[]>): HttpResponse<IAnimal[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
