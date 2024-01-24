export interface IGenetique {
  id: number;
  couleur?: string | null;
  taille?: number | null;
  aptitudesLaitiere?: number | null;
  aptitudesBoucheres?: number | null;
  aptitudesMaternelles?: number | null;
}

export type NewGenetique = Omit<IGenetique, 'id'> & { id: null };
