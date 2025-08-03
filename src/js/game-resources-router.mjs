import { GetGameStatus, GetMapBackgroundImage } from "./game-resources.mjs";

export function RegisterGameResourcesEndpoints(app) {
    app.get("/gamestatus/:id", GetGameStatus);
    app.get("/games/:gameId/resources/mapbackgroundimage", GetMapBackgroundImage);
}