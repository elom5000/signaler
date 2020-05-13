export interface IAgence {
  id?: number;
  nom?: string;
}

export class Agence implements IAgence {
  constructor(public id?: number, public nom?: string) {}
}
