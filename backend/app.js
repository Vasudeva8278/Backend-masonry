import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:5175",
        ],
        credentials: true,
    })
);

import masonryRoute from "./routes/masonry.route.js";
import favouriteRoute from "./routes/favourite.route.js";
import savedRoute from "./routes/saved.route.js";

app.use("/api/v1/masonry", masonryRoute);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/favourite",favouriteRoute);
app.use("/api/v1/saved",savedRoute);

export default app;
