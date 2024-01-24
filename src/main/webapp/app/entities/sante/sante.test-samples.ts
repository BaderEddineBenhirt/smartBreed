import { ISante, NewSante } from './sante.model';

export const sampleWithRequiredData: ISante = {
  id: 79112,
};

export const sampleWithPartialData: ISante = {
  id: 65016,
};

export const sampleWithFullData: ISante = {
  id: 80042,
  traitementsPreventifs: 'interfaces feed open-source',
  soins: 'withdrawal Loan la',
  vaccins: 'quantify',
};

export const sampleWithNewData: NewSante = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
