const Author = require("../models/author.model");

/* CREATE */
const createAuthor = (req, res) => {
    Author.create(req.body)
        .then((author) => res.status(201).json(author))
        .catch((err) => res.status(400).json(err));
};

/*  READ */
const findAllAuthorsSorted = (req, res) => {
    Author.find()
        .sort({ title: 1 })
        .collation({ locale: "en", caseLevel: true })
        .then((authors) => res.status(200).json(authors))
        .catch((err) => res.status(400).json(err));
};

const findOneAuthorByID = (req, res) => {
    const { id } = req.params;
    Author.findById(id)
        .then((author) => res.status(200).json(author))
        .catch((err) => res.status(400).json(err));
};

/* UPDATE */
const updateOneAuthor = (req, res) => {
    const { id } = req.params;
    Author.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        .then((author) => res.status(200).json(author))
        .catch((err) => res.status(400).json(err));
};

/* DELETE */
const deleteOneAuthor = (req, res) => {
    const { id } = req.params;
    Author.findByIdAndDelete(id)
        .then((author) => res.status(200).json(author))
        .catch((err) => res.status(400).json(err));
};

module.exports = { createAuthor, findAllAuthorsSorted, findOneAuthorByID, updateOneAuthor, deleteOneAuthor };
