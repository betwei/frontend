// Types
import { ISendSuccess } from './contract.interface'

export interface IRandomForm {
  onSave?: (res?: ISendSuccess) => void;
  className?: string;
}

export interface IRandomGame {
  idGame?: string;
  balance?: number;
  duration?: number;
  neededAmount?: number;
  gameType?: string;
  status?: string;
  description?: string;
  members?: string[];
  owner?: string;
  winnersIndexed?: string[];
}