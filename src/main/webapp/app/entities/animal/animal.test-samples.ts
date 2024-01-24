import dayjs from 'dayjs/esm';

import { IAnimal, NewAnimal } from './animal.model';

export const sampleWithRequiredData: IAnimal = {
  id: 6476,
};

export const sampleWithPartialData: IAnimal = {
  id: 97686,
  ref: 'a Computers a',
  age: dayjs('2022-09-29'),
  genre: 'a Bretagne',
  type: 25236,
  race: 'convergence copying',
};

export const sampleWithFullData: IAnimal = {
  id: 86869,
  ref: 'Checking Saint-Honoré',
  age: dayjs('2022-09-29'),
  genre: 'des transition',
  poids: 26527,
  refMere: 'Madagascar Shoes',
  refPere: 'Gloves Account',
  type: 48817,
  race: 'reboot Metal Dauphine',
};

export const sampleWithNewData: NewAnimal = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
