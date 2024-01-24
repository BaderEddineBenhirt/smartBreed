import dayjs from 'dayjs/esm';
import { IGenetique } from 'app/entities/genetique/genetique.model';
import { IConditionsDeVie } from 'app/entities/conditions-de-vie/conditions-de-vie.model';
import { IMaladie } from 'app/entities/maladie/maladie.model';
import { IFerme } from 'app/entities/ferme/ferme.model';

export interface IAnimal {
  id: number;
  ref?: string | null;
  age?: dayjs.Dayjs | null;
  genre?: string | null;
  poids?: number | null;
  refMere?: string | null;
  refPere?: string | null;
  type?: number | null;
  race?: string | null;
  genetique?: Pick<IGenetique, 'id'> | null;
  conditionsDeVie?: Pick<IConditionsDeVie, 'id'> | null;
  maladies?: Pick<IMaladie, 'id'>[] | null;
  ferme?: Pick<IFerme, 'id'> | null;
}


export type NewAnimal = Omit<IAnimal, 'id'> & { id: null };
