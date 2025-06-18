import express from "express";
import userRouters from "./routes/users.js";
import cors from "cors";
import { db } from "./db.js";

const app = express(); // Declare primeiro

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  
});

app.use("/users", userRouters);

app.listen(8800, () => {
  console.log("Servidor rodando na porta 8800");
});

 