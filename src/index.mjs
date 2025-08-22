import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const corsOptions = { origin: [process.env.WEB_URL] };

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use(Log);

app.use(
  "/games",
  createProxyMiddleware({
    target: process.env.GAME_API_URL,
    changeOrigin: true,
  })
);

app.listen(process.env.API_PORT, () =>
  console.log("API waiting for connections...")
);

function Log(req, res, next) {
  const now = new Date(Date.now());
  const timeString = ToPreciseTime(now);
  const message = `${req.path}`;

  console.log(
    `${timeString}: \x1b[33m${message}\x1b[0m`
  );

  next();
}

function ToPreciseTime(date) {
  return date.toISOString().substring(11, 23);
}
