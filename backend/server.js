//start your server here
require("dotenv").config();
const app = require("./src/app");

const dbConnect = require("./src/db/db");

dbConnect();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
