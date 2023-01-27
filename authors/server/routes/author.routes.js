const express = require("express");
const AuthorRouter = express.Router();

const {
    createAuthor,
    findAllAuthorsSorted,
    findOneAuthorByID,
    updateOneAuthor,
    deleteOneAuthor,
} = require("../controllers/author.controller");

AuthorRouter
    .route('/')
    .get(findAllAuthorsSorted)
    .post(createAuthor);

AuthorRouter
    .route('/:id')
    .get(findOneAuthorByID)
    .put(updateOneAuthor)
    .delete(deleteOneAuthor);

module.exports = AuthorRouter;