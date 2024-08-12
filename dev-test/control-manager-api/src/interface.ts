import { User } from './core/entities/User.entity';

export interface RetornoError {
  erro: boolean;
  status?: string;
  user?: User[] | any;
}

export interface Retorno {
  id: number;
  nomeCompleto?: string;
  email?: string;
  status?: string;
}
