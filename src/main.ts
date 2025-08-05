import express, { urlencoded } from "express";
import dotenv from "dotenv";
import mainRouter from "./App/routers";
import dbInit from "./database";
import cors from "cors";
import { ErrorMiddleware } from "./Middleware/ErrorMiddleware";
import { AuthMiddleware } from "./Middleware/AuthMiddleware";

dotenv.config();
const PORT = process.env.PORT || 7100;
const app = express();

// app.get("/", (req, res) => {
//   return res.status(200).send("Welcome SYED!!");
// });

dbInit();

app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));
app.use(AuthMiddleware);
app.use("/", mainRouter);

app.use(ErrorMiddleware);

app.listen(PORT, () => {
  console.log("server started @ ", PORT);
});
