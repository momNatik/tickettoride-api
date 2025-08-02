import express from "express";
import cors from "cors";
import { initGameAsync } from "./js/game.mjs";
import path from "path";
import fs from "node:fs/promises";
import { getGameResourceLocalPath } from "./js/common.mjs";
import { GetStatusAsync } from "../tickettoride-backend-common-js/store/game-resources.mjs";

const port = process.env.PORT;

const corsOptions = {
  origin: ["http://localhost:3000"],
};


const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.get("/gamestatus/:id", async (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  const gameId = req.params.id;

  const isReady = await GetStatusAsync(gameId);

  if (isReady) {
    initGameAsync(gameId);
  }

  res.end(isReady.toString());
});

app.get("/games/:gameId/resources/mapbackgroundimage", async (req, res) => {
  res.setHeader("Content-Type", "image/png");

  const gameId = req.params.gameId;
  const imageLocalPath = getGameResourceLocalPath(gameId, 'mapbackgroundimage');
  const image = await fs.readFile(imageLocalPath);

  res.end(image);
});

app.listen(port, () => console.log("Game API waiting for connections..."));
