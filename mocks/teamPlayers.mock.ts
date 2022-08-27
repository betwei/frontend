import { ICardOverview } from "../src/interfaces/gameOverview.interface";

const TEAM_PLAYERS_MOCK: ICardOverview = {
  buttonTitle: "Apostar ya",
  date: "13 Oct 2022, 11:AM GMT +0",
  headerTitle: "Copa del mundo, FIFA",
};

export const generatePlayersMock = (size = 10) => {
  return Array.from(Array(size).keys()).map((_) => TEAM_PLAYERS_MOCK);
};
