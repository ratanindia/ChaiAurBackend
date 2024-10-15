
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './db/index.js';

const app = express()

dotenv.config({
    path: './env'
})


connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port ${process.env.PORT}`);
            app.on("error", (error) => {
                console.log(`server not able to connect`);
                throw error;

            })
        })
            .catch((err) => {
                console.log(`MONGODB Connection Failed !!`, err)

            })
