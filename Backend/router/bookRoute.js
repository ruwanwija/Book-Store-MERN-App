import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();


// Route to save a new book
router.post('/', async (request, response) => {   
    try {
        const { title, author, publishYear } = request.body;
        if (!title || !author || !publishYear) {
            return response.status(400).send({ message: 'All fields are required' });
        }
        const newBook = { 
            title:request.body.title, 
            author:request.body.author, 
            publishYear:request.body.publishYear
         };
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: 'Internal Server Error' });
    }
});

//Route for Get All Books from Database
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count:books.length,
            data:books
        });
    } catch (error) {
        console.error('Error fetching books:', error);
        // Optionally, check error type and send different messages or status codes
        response.status(500).send({ message: "Internal Server Error", error: error.message });
    }
});

//Route for Get One Book from Database by id
router.get('/:id', async (request, response) => {
    try {
    
        const {id} = request.params;   

        const book = await Book.findById(id);
        return response.status(200).json(book);
    } catch (error) {
        console.error('Error fetching books:', error);
        // Optionally, check error type and send different messages or status codes
        response.status(500).send({ message: "Internal Server Error", error: error.message });
    }
});

//Router for Update a Book
router.put('/:id',async(request,response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message:'Send all required feilds:title,author,publishYear',
            });
        }
        const {id} = request.params;

        const result = await Book.findByIdAndUpdate(id,request.body);

        if(!result){
            return response.status(404).send({message:'Book not found'});
        }
        return response.status(200).send({message:`Book ${id} updated successfully`});
    }catch(error){
            console.log(error);
            response.status(500).send({message:error.message});   
        }
    });

//Router for Delete a Book
router.delete('/:id', async (request, response) => {
    try {
    
        const {id} = request.params;   

        const result = await Book.findById(id);

        if(!result){
            return response.status(404).json({message:'Book not fount'})
        }
        return response.status(200).send({message:`Book ${id} deleted successfully`});
        return response.status(200).json(book);
    } catch (error) {
        console.error('Error fetching books:', error);
        response.status(500).send({ message: "Internal Server Error", error: error.message });
    }
});

export default router;