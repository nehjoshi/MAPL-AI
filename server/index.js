import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node'
import ImageKit from 'imagekit';
import mongoose from "mongoose";
import Chat from './models/ChatModel.js';
import UserChat from './models/UserChatModel.js';

const app = express();

dotenv.config();
app.use(cors({ credentials: true }));
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

app.post("/api/chats", ClerkExpressRequireAuth({
    // Add options here
    // See the Middleware options section for more details
}),
    async (req, res) => {
        const { userId, text } = req.body;
        try {
            const newChat = new Chat({
                userId: userId,
                history: [{ role: "user", parts: [{ text }] }]
            })
            const savedChat = await newChat.save();

            //Check if user chat exists
            const userChats = await UserChat.find({ userId: userId });

            if (userChats.length === 0) {
                const newUserChats = new UserChat({
                    userId: userId,
                    chats: [
                        {
                            _id: savedChat._id,
                            title: text.substring(0, 40)
                        }
                    ]
                })
                await newUserChats.save();
            }
            else {
                await UserChat.updateOne({ userId: userId }, {
                    $push: {
                        chats: {
                            _id: savedChat._id,
                            title: text.substring(0, 40)
                        }
                    }
                })
            }

            res.status(201).send(newChat._id);
        } catch (err) {
            console.log(err);
            res.status(500).send("Error creating chat");
        }
    })


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(401).send('Unauthenticated!')
});

app.listen(process.env.PORT, () => {
    console.log("Listening on port", process.env.PORT);
    ConnectToDb();
})