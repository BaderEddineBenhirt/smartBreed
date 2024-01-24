import { IConditionsDeVie, NewConditionsDeVie } from './conditions-de-vie.model';

export const sampleWithRequiredData: IConditionsDeVie = {
  id: 9691,
};

export const sampleWithPartialData: IConditionsDeVie = {
  id: 3873,
  temperature: 91508,
  sol: 69466,
};

export const sampleWithFullData: IConditionsDeVie = {
  id: 85397,
  ageMin: 42973,
  ageMax: 17004,
  temperature: 95081,
  vitesseAir: 95083,
  sol: 32042,
};

export const sampleWithNewData: NewConditionsDeVie = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
