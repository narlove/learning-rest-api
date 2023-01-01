const router = require('express').Router();
const library = require('./library.json');
const fs = require('fs');

router.get("/books", (req, res) => {
    res.status(200).send(library.books);
});

router.get("/books/:id", (req, res) => {
    const { id } = req.params;
    const selectedBook = library.books.find(book => { return book.uuid === id });

    if (!selectedBook) return res.status(404).send({ message: 'Book does not exist '});
    
    res.status(200).send(selectedBook);
});

router.post("/books/", (req, res) => {
    const {
        title,
        uuid,
        status,
        authors,
        series
    } = req.body;

    if (!title || !uuid || !status || !authors) return res.status(400).send({ messsage: 'Incorrect arguments' });

    const existingBook = library.books.find(book => { return book.uuid === uuid });

    if (existingBook) return res.status(400).send({ message: `A book with UUID ${existingBook.uuid} already exists`});

    const bookToAdd = {
        title,
        uuid,
        status,
        authors,
        series
    };

    library.books.push(bookToAdd);
    
    //fs.writeFileSync('./src/library.json', JSON.stringify(library.books));

    res.status(200).send({ message: `A book with UUID ${uuid} was successfully added to the library.` });

    // let preexistingFile = fs.readFileSync('./src/write_test.json');
    // let content = JSON.parse(preexistingFile);
    // content.books[0].uuid = 4;
    // console.log(content);
});

router.put("/books/:id", (req, res) => {
    const { id } = req.params;
    
    const {
        title,
        uuid,
        status,
        authors,
        series
    } = req.body;

    const updateField = (val, prev) => !val ? prev : val;

    const existingBook = library.books.find(book => book.uuid === id);
    if (!existingBook) return res.status(404).send({ message: 'Book does not exist' })

    const updatedBook = {
        title: updateField(title, existingBook.title),
        uuid: updateField(uuid, existingBook.uuid),
        status: updateField(status, existingBook.status),
        authors: updateField(authors, existingBook.authors),
        series: updateField(series, existingBook.series)
    }

    // consider the possibility that the isbn of the book changes
    const existingBookIndex = library.books.findIndex(book => {
        return book.uuid === uuid;
    });

    library.books.splice(existingBookIndex, 1, updatedBook);
    res.status(200).send({ message: `Book with UUID ${updatedBook.uuid} has been successfully updated.` })
});

router.delete("/books/:id", (req, res) => {
    const { id } = req.params;

    const existingBook = library.books.find(book => book.uuid === id);
    if (!existingBook) return res.status(404).send({ message: 'Book does not exist' });
    const existingBookId = library.books.findIndex(book => {return book.uuid === id});

    library.books.splice(existingBookId, 1);

    res.status(200).send({ message: `Book with UUID ${id} has been successfully removed.` })
});

module.exports = router;