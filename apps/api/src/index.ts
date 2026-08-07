import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("DevMatrix API is running");
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
