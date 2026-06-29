import dotenv from "dotenv";
import express from "express";
import connectMongo from "./configdb/mongodb.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";

dotenv.config();

const app = express();

app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

const startServer = async () => {
    try {
        await connectMongo();
        app.listen(5000, () => {
            console.log("Server is running on port 5000");
        });
    } catch (err) {
        console.error(err);
    }
};

startServer();