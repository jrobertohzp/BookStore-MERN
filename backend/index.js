import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoutes from './routes/booksRoutes.js';
import cors from 'cors';


const app = express();

//MIDDLEWARE FOR PARSING REQUEST BODY
app.use(express.json());

//MIDDLEWARE FOR CORS POLICY

//Option 1: Allow all origins

app.use(cors());

//Option 2: Allow only specific origins

app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('In nature nothing exist alone. ')
})

app.use('/books', booksRoutes);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error)
    });



