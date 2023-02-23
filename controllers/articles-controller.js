const app = require('../app');
const { fetchArticles, fetchArticleById, fetchCommentsByArticleId } = require('../models/model.js');
const { handleServerErrors, handleCustomErrors, handlePSQLErrors } = require('./error-handling-controller')

const getArticles = (req, res, next) => {
    const { sort_by, order } = req.query;
    fetchArticles(sort_by, order)
    .then((articles) => {
        res.status(200).send({ articles })
    })
    .catch((err) => {
        next(err)
    })
}

const getArticleById = (req, res, next) => {
    const { article_id } = req.params;
    fetchArticleById(article_id)
    .then((article) => {
        res.status(200).send({ article })
    })
    .catch((err) => {
        next(err)
    })
}

const getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params;
    fetchCommentsByArticleId(article_id)
    .then((comments) => {
        res.status(200).send({ comments })
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = { getArticles, getArticleById, getCommentsByArticleId };