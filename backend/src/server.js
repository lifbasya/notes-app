import express from "express";
import { testConnection } from "./config/db.js";
import helloRouter from "./routes/hellorRoute.js";

const app = express();
const port = 3000;

app.use("/", helloRouter);

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
  testConnection();
});
