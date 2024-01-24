import { ISuivi, NewSuivi } from './suivi.model';

export const sampleWithRequiredData: ISuivi = {
  id: 20812,
};

export const sampleWithPartialData: ISuivi = {
  id: 15744,
  poids30: 14056,
  poids90: 71679,
  gmq30: 97568,
  gmq3070: 58323,
  changeDents: 75096,
};

export const sampleWithFullData: ISuivi = {
  id: 99471,
  poids0: 45932,
  poids30: 99414,
  poids90: 47539,
  gmq30: 90808,
  gmq3070: 44090,
  changeDents: 16433,
};

export const sampleWithNewData: NewSuivi = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
