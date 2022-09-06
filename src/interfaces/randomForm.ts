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
  gameType?: number;
  status?: string;
  description?: string;
  members?: string[];
  owner?: string;
}