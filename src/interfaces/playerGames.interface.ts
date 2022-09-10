// Types
import { IRandomGame } from './randomForm.interface'

export interface IPlayerGames {
  onSelectedGame?: (game: string) => void;
  className?: string;
}