import { GetStatusAsync } from "../../tickettoride-backend-common-js/src/store/game-resources.mjs";
import { getGameResourceLocalPath } from "./common.mjs";


export async function GetGameStatus(req, res) {
  res.setHeader("Content-Type", "text/plain");
  const gameId = req.params.id;

  const isReady = await GetStatusAsync(gameId);

  if (isReady) {
    initGameAsync(gameId);
  }

  res.end(isReady.toString());
}

export async function GetMapBackgroundImage(req, res) {
  res.setHeader("Content-Type", "image/png");

  const gameId = req.params.gameId;
  const imageLocalPath = getGameResourceLocalPath(gameId, 'mapbackgroundimage');
  const image = await fs.readFile(imageLocalPath);

  res.end(image);
}