const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
app.use(express.static("../FRONTEND/static"));
const path = require("path");

// you can read information from json
app.use(express.json());
app.use(express.urlencoded());

// set the view engine to ejs
// app.set("view engine", "ejs");

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// this is connection with my database
const connection = require("./db");
// -------------------------------------------RENDERING WEBSITES
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../FRONTEND/static/home.html"));
});

app.get("/articles", (req, res) => {
  res.sendFile(path.join(__dirname, "../FRONTEND/static/articles.html"));
});

// ------------------------------------------GET - getting all posts
app.get("/posts", (req, res) => {
  // res.send("GET/posts");
  const sql = `SELECT * FROM reddit.posts`;

  connection.query(sql, function (error, results) {
    if (error) {
      res.status(500).send(error.message);
    }
    // this results I can see in postman
    res.status(200).json(results);
  });
});
// ------------------------------------------POST
app.post("/posts", (req, res) => {
  const sql = "INSERT INTO posts SET ?";

  console.log(req.body);

  const data = {
    title: req.body.title,
    url: req.body.url,
    timestamp: Date.now(),
    score: 0,
  };

  if (!req.body.title) {
    res.status(400).json({ error: "The title is required" });
    return;
  }

  if (!req.body.url) {
    res.status(400).send({ error: "The url is required" });
    return;
  }

  connection.query(sql, data, function (error, results) {
    if (error) {
      res.status(500).send(error.message);
      return;
    }
    res.json(data);
  });
});
// ------------------------------------------DELETE
app.delete("/posts/:id", (req, res) => {
  const sql = "DELETE FROM reddit.posts where id = ?";
  const sql_check = "SELECT * FROM reddit.posts where id = ?";

  // body
  connection.query(sql_check, req.params.id, function (error, results) {
    if (error) {
      res.status(500).send(error.message);
      return;
    }
    console.log(results);
    res.json(results);
  });

  connection.query(
    "DELETE FROM posts WHERE id = ?",
    req.params.id,
    function (error, results) {
      if (error) {
        res.json(error.message);
        return;
      }
    }
  );
});

// ------------------------------------------PUT (UPDATE)
app.put("/posts/:id/upvote", (req, res) => {
  connection.query(
    "UPDATE posts SET score = score + 1 WHERE id = ?",
    req.params.id,
    function (error, results) {
      if (error) {
        res.json(error.message);
        return;
      }

      connection.query(
        "SELECT * FROM posts WHERE id = ?",
        req.params.id,
        function (error, results) {
          if (error) {
            res.json(error.message);
            return;
          }
          if (!results || results.length === 0) {
            res.status(404).send({ error: "Post not found" });
          }
          // res.json(results.score);
          console.log(results);
          res.json(results);
        }
      );
    }
  );
});

// ------------------------------------------PUT (UPDATE)

app.put("/posts/:id/downvote", (req, res) => {
  connection.query(
    "UPDATE posts SET score = score - 1 WHERE id = ?",
    req.params.id,
    function (error, results) {
      if (error) {
        res.json(error.message);
        return;
      }

      connection.query(
        "SELECT * FROM posts WHERE id = ?",
        req.params.id,
        function (error, results) {
          if (error) {
            res.json(error.message);
            return;
          }
          if (!results || results.length === 0) {
            res.status(404).send({ error: "Post not found" });
          }
          // res.json(results.score);
          res.json(results);
        }
      );
    }
  );
});
