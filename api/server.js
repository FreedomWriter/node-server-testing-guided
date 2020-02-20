const express = require("express");

const Hobbits = require("../hobbits/hobbitsModel.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/hobbits", (req, res) => {
  Hobbits.getAll()
    .then(hobbits => {
      res.status(200).json(hobbits);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post("/hobbits", async (req, res) => {
  try {
    const hobbit = await Hobbits.insert(req.body);
    res.status(201).json(hobbit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

if (!module.parent) {
  const port = process.env.PORT || 5000;
  server.listen(port, () => console.log(`\n** server up on port ${port} **\n`));
}

module.exports = server;
