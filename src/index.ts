import express from "express";
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";
import cors from "cors";
import "./authStrategies/localStrategy";

//routes
import { campaignRoutes } from "./routes/campaign";
import authRouter from "./routes/auth";
import { router as userRouter } from "./routes/user";

const app = express();

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://e3ivo6zw56.execute-api.us-east-1.amazonaws.com/dev"]
    : ["http://localhost:5173"];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

dotenv.config();

// gitHubStrategy
app.use(
  session({
    secret: "hemligt",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
// app.use(cors())

// ROUTES
app.use(express.json());
app.use("/campaign", campaignRoutes);
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
const SERVER_PORT = process.env.SERVER_PORT || 1337;

app.listen(SERVER_PORT, () => {
  console.log("Server started on: " + SERVER_PORT);
});

// if (process.env.VERCEL !== "1") {
//   const PORT = process.env.PORT || 1337;
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// }

export default app;
