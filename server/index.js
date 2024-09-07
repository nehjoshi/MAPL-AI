import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ImageKit from 'imagekit';

const app = express();

dotenv.config();
app.use(cors());

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
    return res.json({message: "Hello from server"});
})



app.listen(process.env.PORT, () => {
    console.log("Listening on port", process.env.PORT);
})