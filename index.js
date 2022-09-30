//createad by Ratan Kumar Pradhan

const http = require("http");
const projects = require("./data-store");

const server = http.createServer((req, res) => {
  // route to /projects/:id
  if (req.method === "GET" && req.url.match(/\/projects\/\d+$/)) {
    let id = parseInt(req.url.split("/")[2]);

    let data = projects.filter((project) => {
      return project.id === id;
    });

    //if any matches in data-store
    if (data.length > 0) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
    } else {
      //no matches in data-store
      res.statusCode = 404;
      res.end();
    }
  } else if (
    req.method === "GET" &&
    (req.url === "/projects" || req.url === "/projects/")
  ) {
    // for route /projects
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "BAD REQUEST" }));
  } else {
    //everything else
    res.statusCode = 404;
    res.end();
  }
});

const PORT = 8000;
const HOST = "localhost";

server.listen(PORT, HOST, () => {
  console.log("listening on port " + PORT);
});
