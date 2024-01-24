import { IUser } from 'app/entities/user/user.model';

export interface IFerme {
  id: number;
  adresse?: string | null;
  taille?: number | null;
  user?: Pick<IUser, 'id'> | null;
}

export type NewFerme = Omit<IFerme, 'id'> & { id: null };
