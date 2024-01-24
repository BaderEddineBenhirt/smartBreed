export interface IMendel {
  id?: number;
  father?: string | null;
  mother?: string | null;
  result?: string | null;
}
export class Mendel implements IMendel {
  constructor(public id?: number, public father?: string | null, public mother?: string | null, public result?: string | null) {}
}
export function getMendelIdentifier(mandel: IMendel): number | undefined {
  return mandel.id;
}
