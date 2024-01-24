import { INutrition, NewNutrition } from './nutrition.model';

export const sampleWithRequiredData: INutrition = {
  id: 55867,
};

export const sampleWithPartialData: INutrition = {
  id: 93425,
  melasse: 93237,
  paile: 6917,
  bettraveSucriere: 6420,
  cmv: 11278,
  ageMin: 45422,
};

export const sampleWithFullData: INutrition = {
  id: 96718,
  melasse: 39695,
  paile: 50381,
  tourteauTournesol: 52566,
  bettraveSucriere: 24397,
  cmv: 19312,
  ageMin: 58797,
  ageMax: 36691,
};

export const sampleWithNewData: NewNutrition = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
