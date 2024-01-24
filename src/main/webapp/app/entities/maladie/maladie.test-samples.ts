import { IMaladie, NewMaladie } from './maladie.model';

export const sampleWithRequiredData: IMaladie = {
  id: 44228,
};

export const sampleWithPartialData: IMaladie = {
  id: 96071,
  nomMaladie: 'Bedfordshire',
  symptomes: 'program Frozen Electronics',
};

export const sampleWithFullData: IMaladie = {
  id: 31666,
  nomMaladie: 'Executif',
  symptomes: 'Aquitaine evolve lavender',
};

export const sampleWithNewData: NewMaladie = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
