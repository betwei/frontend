import { IRandomGame as irg } from './randomForm'

export interface IRandomGame {
  game: irg;
  className?: string;
  onChangeGame?: (idGame?: string) => void;
}