import { IRandomGame as irg } from './randomForm.interface'

export interface IRandomGame {
  game: irg;
  className?: string;
  onChangeGame?: (idGame?: string) => void;
}