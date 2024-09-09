import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ImageKit from 'imagekit';
import mongoose from "mongoose";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

const ConnectToDb = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("Connected to DB");
    }
    catch (err) {
        console.log(err);
    }
}

const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

app.get("/api/upload", (req, res) => {
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
})

app.get("/test", (req, res) => {
    return res.json({ message: "Hello from server" });
})

app.post("/api/chats", async (req, res) => {
    const { text } = req.body;
    console.log(text);
})



app.listen(process.env.PORT, () => {
    console.log("Listening on port", process.env.PORT);
    ConnectToDb();
})
app.get("/another-test", (req, res) => {
    console.log("This test worked well!");
})