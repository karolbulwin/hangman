export class Utils {
  public static getTime(gameTime: number): string {
    const newGameTime = gameTime + 1;
    let minutes = 0;
    let seconds = 0;
    let time: string;

    minutes = Math.floor(newGameTime / 60);
    seconds = Math.floor(newGameTime % 60);

    if (minutes) {
      time = `${minutes}m:${seconds}s`;
    } else {
      time = `${seconds}s`;
    }
    return time;
  }
}
