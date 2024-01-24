import { IAnimal } from 'app/entities/animal/animal.model';

export interface IMaladie {
  id: number;
  nomMaladie?: string | null;
  symptomes?: string | null;
  animals?: Pick<IAnimal, 'id'>[] | null;
}

export type NewMaladie = Omit<IMaladie, 'id'> & { id: null };
