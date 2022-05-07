import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { connectMongoDb } from "./models/initMongoose.js";
import { AuthRouters } from "./routers/auth.router.js";
import { LoanTakerRoutes } from "./routers/loanTaker.router.js";
import { LoanGiverRoutes } from "./routers/loanGiver.router.js";
import path from "path";
import fs from "fs";
import { checkEnvVariables } from "./utils/checkEnvVariables.js";
const app = express();

// configure environmental variables of .env file
if (process.env.NODE_ENV !== "production") {
  if (!fs.existsSync(path.join(path.resolve(), ".env"))) {
    console.error(".env file not exist");
    process.exit();
  }
  dotenv.config();
}
checkEnvVariables();

// MIDDLEWARES
// Request body parser middleware
app.use(express.json());
// Cors middleware to allow access from all sites (*)
app.use(cors());

// CONNECT TO MONGODB DATABASE SERVER
try {
  await connectMongoDb();
  console.log("MongoDB connected.....");
} catch (err) {
  console.log("DATABASE NOT CONNECTED");
  console.log(err);
  process.exit();
}
// CHECK SERVER HEALTH
app.get("/check", (req, res) => {
  res.send({ message: "Server up and running...." });
});

//AUTHENTICATION ROUTERS - LOGIN AND SIGNUP
app.use(AuthRouters);

//APIS TO BORROW LOANS
app.use(LoanTakerRoutes);

//APIS TO LEND LOANS
app.use(LoanGiverRoutes);

// REQUESTED ROUTE NOT FOUND
app.use(notFound);

// GLOBAL ERROR HANDLING FOR API REQUEST
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
