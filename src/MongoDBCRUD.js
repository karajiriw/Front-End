const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect(
    "mongodb://webadmin:YBGshr13922@node57053-kittipong-noderest.proen.app.ruk-com.cloud:11809/Books",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

const book = mongoose.model("Book", {
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    title: String,
    author: String,
});

const app = express();
app.use(bodyParser.json());

app.post("/books", async (req, res) => {
    try{
        const lastBook = await book.findOne().sort({ id: -1 });
        const nextId = lastBook ? lastBook.id + 1 : 1;

        const book = new Book({
            id: nextId,
            ...req.body,
        });

        await book.save();
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/books", async (req, res) => {
    try {
        const books = await Book.find();
        res.send(books);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/books/:id", async (req, res) => {
    try {
        const book = await Book.findOne({id:req.params.id});
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put("/books/:id", async (req, res) => {
    try {
        const book = await Book.findOneAndUpdate({id:req.params.id}, req.body, {
            new: true,
        });
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});