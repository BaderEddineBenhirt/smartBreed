import { IAnimal } from 'app/entities/animal/animal.model';

export interface INutrition {
  id: number;
  melasse?: number | null;
  paile?: number | null;
  tourteauTournesol?: number | null;
  bettraveSucriere?: number | null;
  cmv?: number | null;
  ageMin?: number | null;
  ageMax?: number | null;
  animal?: Pick<IAnimal, 'id'> | null;
}

export type NewNutrition = Omit<INutrition, 'id'> & { id: null };
