import express from "express";
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";
import cors from "cors";
import "./authStrategies/localStrategy.js";
//routes
import { campaignRoutes } from "./routes/campaign.js";
import authRouter from "./routes/auth.js";
import { router as userRouter } from "./routes/user.js";
const app = express();
const allowedOrigins = process.env.NODE_ENV === "production"
    ? ["https://main.d5od8j2t64g0j.amplifyapp.com/"]
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
app.use(session({
    secret: "hemligt",
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(cors())
// ROUTES
app.use(express.json());
app.use("/campaign", campaignRoutes);
app.use("/users", userRouter);
app.use("/auth", authRouter);
// const SERVER_PORT = process.env.SERVER_PORT || 1337;
// app.listen(SERVER_PORT, () => {
//   console.log("Server started on: " + SERVER_PORT);
// });
if (process.env.VERCEL !== "1") {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
export default app;