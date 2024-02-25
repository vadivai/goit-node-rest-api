const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();
const mongoose = require("mongoose");
const { DB_HOST, PORT = 3000 } = process.env;
// const PORT = 3000;
// const DB_HOST =
//   "mongodb+srv://admin:7X855Z5sRvbwcpG9@cluster0.ibb15yf.mongodb.net/Library?retryWrites=true&w=majority&appName=Cluster0";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    // app.listen(PORT);
    app.listen(PORT, () => {
      console.log("Server is running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

const authRouter = require("./routes/auth");
const contactsRouter = require("./routes/contactsRouter");

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
  // console.log(status, message);
});
