import { IRandomGame } from "./randomForm.interface";

export interface IShareGame {
  game: IRandomGame;
  className?: string;
}