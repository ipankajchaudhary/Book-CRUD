const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser')
const Book = require('../Models/Book')
const { body, validationResult } = require('express-validator');

// Route 1: Get All Book using : GET

router.get('/fetchallbooks', fetchuser, async (req, res) => {

    try {
        const books = await Book.find({ user: req.user.id });
        res.json(books)

    } catch (error) {
        res.status(500).send("Some Error Occurred")
    }
})

// ROUTE 2: Add a new Book using: POST "/api/auth/addbook". Login required
router.post('/addbook', fetchuser, async (req, res) => {
        try {
// •	Name
// •	Image url
// •	Author
// •	pages
// •	price

            const { name, imageurl, author, pages, price } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const book = new Book({
                name, imageurl, author, pages, price, user: req.user.id
            })
            const savedBook = await book.save()

            res.json(savedBook)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
})
    // ROUTE 3: Update an existing Book using: POST "/api/book/updatebook". Login required

router.put('/updatebook/:id', fetchuser, async (req, res) => {
    const { name, imageurl, author, pages, price } = req.body;
    // Create a newBook object
    const newBook = {};
    if(name){newBook.name = name};
    if (imageurl) { newBook.imageurl = imageurl };
    if(author){newBook.author = author};
    if (pages) { newBook.pages = pages };
    if (price) { newBook.price = price };
   

    // Find the book to be updated and update it
    let book = await Book.findById(req.params.id);
    if(!book){return res.status(404).send("Not Found")}

    if(book.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    book = await Book.findByIdAndUpdate(req.params.id, {$set: newBook}, {new:true})
    res.json({book});

})
    
 // ROUTE 4: Delete an existing Book using: POST "/api/book/deletebook". Login required

 router.delete('/deletebook/:id', fetchuser, async (req, res) => {
    const { name, imageurl, author, pages, price } = req.body;

    // Find the book to be deleted and delete it
    let book = await Book.findById(req.params.id);
    if(!book){return res.status(404).send("Not Found")}

    //  Allow deletion only if user owns this book 
    if(book.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    book = await Book.findByIdAndDelete(req.params.id)
    res.json({"Success" : "Book deleted"});

    })


module.exports = router