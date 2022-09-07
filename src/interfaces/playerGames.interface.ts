// Types
import { IRandomGame } from './randomForm.interface'

export interface IPlayerGames {
  onSelectedGame?: (game: IRandomGame) => void;
  className?: string;
}