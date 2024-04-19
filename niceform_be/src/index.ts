import express from "express";
import { router } from "./routes";

const app = express();

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	next();
});

app.use(express.text());

app.use(router);

app.listen(3001, () => {
  console.log(`Server running at http://localhost:${3001}`);
});
