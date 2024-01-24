import { IFerme, NewFerme } from './ferme.model';

export const sampleWithRequiredData: IFerme = {
  id: 85008,
};

export const sampleWithPartialData: IFerme = {
  id: 56538,
  taille: 85720,
};

export const sampleWithFullData: IFerme = {
  id: 48080,
  adresse: 'array',
  taille: 57613,
};

export const sampleWithNewData: NewFerme = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
