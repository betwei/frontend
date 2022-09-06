// Types
import { IRandomGame } from './randomForm'

export interface IPlayerGames {
  onSelectedGame?: (game: IRandomGame) => void;
  className?: string;
}