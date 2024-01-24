import { IGenetique, NewGenetique } from './genetique.model';

export const sampleWithRequiredData: IGenetique = {
  id: 6669,
};

export const sampleWithPartialData: IGenetique = {
  id: 21619,
};

export const sampleWithFullData: IGenetique = {
  id: 47401,
  couleur: 'Networked',
  taille: 27582,
  aptitudesLaitiere: 25571,
  aptitudesBoucheres: 93206,
  aptitudesMaternelles: 86597,
};

export const sampleWithNewData: NewGenetique = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
