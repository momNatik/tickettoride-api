import express from "express";
import cors from "cors";
import { RegisterGameResourcesEndpoints } from "./js/game-resources-router.mjs";
import { initGameAsync } from "./js/game.mjs";
import path from "path";
import fs from "node:fs/promises";

const port = process.env.PORT;

const corsOptions = {
  origin: ["http://localhost:3000"],
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

RegisterGameResourcesEndpoints(app);

app.listen(port, () => console.log("Game API waiting for connections..."));