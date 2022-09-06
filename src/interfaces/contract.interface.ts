export interface ISendSuccess {
  events?: {
    NewGameCreated?: {
      returnValues?: {
        gameId?: string;
      };
    }
  }
}