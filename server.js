const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

app.use("/api/user", require("./routes/users"));
app.use("/api/todos", require("./routes/todos"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));