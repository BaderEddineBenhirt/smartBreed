export interface IConditionsDeVie {
  id: number;
  ageMin?: number | null;
  ageMax?: number | null;
  temperature?: number | null;
  vitesseAir?: number | null;
  sol?: number | null;
}

export type NewConditionsDeVie = Omit<IConditionsDeVie, 'id'> & { id: null };
