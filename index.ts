import express from "express";
import fs from "fs";
import https from "https";
import dotenv from "dotenv";
dotenv.config();
import sequelize from "./config/database";
import authRoutes from "./routes/authRoutes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/auth",authRoutes);
// Error middleware
app.use((err: any, req: any, res: any, next: any) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      status_cd: 0,
      error: {
        errorCode: "BAD101",
        errorMessage: "Bad request. Invalid JSON payload.",
      },
    });
  }
  next();
});

app.get("/", (req, res) => {
  res.send("This is HTTPS Server");
});


// HTTPS setup
const options = {
  key: fs.readFileSync("./server.key"),
  cert: fs.readFileSync("./server.crt"),
};

https.createServer(options, app).listen(port, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter:true});
    console.log("DB connected and synced successfully!");
  } catch (err) {
    console.log("DB connection error:", err);
  }
  console.log(`Server is listening at port ${port}`);
});
