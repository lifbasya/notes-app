import express from "express";
import { testConnection } from "./config/db.js";
import helloRouter from "./routes/hellorRoute.js";
import noteRouter from "./routes/notesRoute.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use(helloRouter);
app.use(noteRouter);

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
  testConnection();
});
