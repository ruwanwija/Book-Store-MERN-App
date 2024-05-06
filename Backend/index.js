import express, { request } from 'express';
import { PORT, mongodbURL } from '../Backend/config.js';
import mongoose from 'mongoose';
import booksRoute from './router/bookRoute.js';
import cors from 'cors';

const app = express();
app.use(express.json()); // Middleware to parse JSON

app.use(cors({
    origin: true, // Allows all origins
    methods: ["POST", "GET", "PUT", "DELETE"], // Corrected methods list
    credentials: true // Allows cookies and other credentials
}));

app.get('/', (request, response) => {
    console.log(request);
    return response.status(200).send('Welcome to MERN Stack');
});

app.use('/books', booksRoute);

mongoose.connect(mongodbURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error(error);
    });
