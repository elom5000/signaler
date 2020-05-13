import { IUser } from 'app/core/user/user.model';
import { IAgence } from 'app/shared/model/agence.model';

export interface IProblemes {
  id?: number;
  libelle?: string;
  numeroIp?: string;
  user?: IUser;
  agence?: IAgence;
}

export class Problemes implements IProblemes {
  constructor(public id?: number, public libelle?: string, public numeroIp?: string, public user?: IUser, public agence?: IAgence) {}
}
