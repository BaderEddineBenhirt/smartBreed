import { IMaladie } from 'app/entities/maladie/maladie.model';

export interface ISante {
  id: number;
  traitementsPreventifs?: string | null;
  soins?: string | null;
  vaccins?: string | null;
  maladie?: Pick<IMaladie, 'id'> | null;
}

export type NewSante = Omit<ISante, 'id'> & { id: null };
