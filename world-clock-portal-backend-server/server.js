const express = require("express");
const app = express();

/*Configure cors to server accept request from frontend server.(fetching data fro backend server) */
const cors = require("cors");
corsOptions = {
  origin: "http://localhost:5173/",
};

app.get("/cities", (req, res) => {
  res.json({ cities: ["london", "colombo", "new york"] });
});

/*configure route*/
app.listen(8080, () => {
  console.log("port started on port 8080");
});
