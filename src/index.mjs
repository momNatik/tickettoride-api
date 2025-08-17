import express from "express";
import cors from "cors";
import { createProxyMiddleware } from 'http-proxy-middleware';

const corsOptions = { origin: [process.env.WEB_URL] };

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use('/games', createProxyMiddleware({ target: process.env.GAME_API_URL, changeOrigin: true }));

app.listen(process.env.API_PORT, () => console.log("API waiting for connections..."));