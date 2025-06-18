const express = require("express");
const cors = require("cors");

const app = express();
const port = 8800;

app.use(cors());
app.use(express.json());

let users = [];
let currentId = 1;

app.get("/", (req, res) => {
  res.json(users);
});

app.post("/", (req, res) => {
  const { nome, email, fone, data_nascimento } = req.body;
  if (!nome || !email || !fone || !data_nascimento) {
    return res.status(400).send("Todos os campos são obrigatórios.");
  }

  const newUser = {
    id: currentId++,
    nome,
    email,
    fone,
    data_nascimento,
  };
  users.push(newUser);
  res.status(201).send("Usuário cadastrado com sucesso!");
});

app.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nome, email, fone, data_nascimento } = req.body;

  const index = users.findIndex((u) => u.id === parseInt(id));
  if (index === -1) return res.status(404).send("Usuário não encontrado.");

  users[index] = { id: parseInt(id), nome, email, fone, data_nascimento };
  res.send("Usuário atualizado com sucesso!");
});

app.delete("/:id", (req, res) => {
  const { id } = req.params;
  users = users.filter((u) => u.id !== parseInt(id));
  res.send("Usuário deletado com sucesso!");
});

app.listen(port, () => {
  console.log(`✅ Servidor rodando em http://localhost:${port}`);
});
