const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {

  const { title, url, techs } = request.body;
  const newRepo = { "id": uuid(), title, url, techs, "likes": 0 }
  repositories.push(newRepo)
  //console.log(repositories)

  return response.json(newRepo)
});



app.put("/repositories/:id", (request, response) => {

  const { id } = request.params
  const repoIndex = repositories.findIndex(repos => repos.id === id)

  if (repoIndex < 0) {
    return response.status(400).json({ "msg": "notFound" })

  }

  const { title, url, techs } = request.body;
  const updatedRepo = { id, title, url, techs }

  repositories[repoIndex] = updatedRepo


  return response.json(updatedRepo)



});

app.delete("/repositories/:id", (request, response) => {
  // TODO

  const { id } = request.params
  const repoIndex = repositories.findIndex(repos => repos.id === id)

  if (repoIndex < 0) {
    return response.status(400).json({ "msg": "notFound" })

  }

  repositories.splice(repoIndex, 1)

  return response.status(204).json({ "msg": "repo deleted" })

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO

  const { id } = request.params
  const repoIndex = repositories.findIndex(repos => repos.id === id)

  if (repoIndex < 0) {
    return response.status(400).json({ "msg": "notFound" })

  }

  let { likes } = repositories[repoIndex]
  likes = likes + 1
  repositories[repoIndex].likes = likes


  return response.json(repositories)
});

module.exports = app;
