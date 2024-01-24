import { IAnimal } from 'app/entities/animal/animal.model';

export interface ISuivi {
  id: number;
  poids0?: number | null;
  poids30?: number | null;
  poids90?: number | null;
  gmq30?: number | null;
  gmq3070?: number | null;
  changeDents?: number | null;
  animal?: Pick<IAnimal, 'id'> | null;
}

export type NewSuivi = Omit<ISuivi, 'id'> & { id: null };
