// Types
import { IRandomGame } from './randomForm.interface'

export interface IPlayerGames {
  currentSelected?: string;
  onSelectedGame?: (game: string) => void;
  className?: string;
}