const db = require('../db/connection')


const fetchTopics = () => {
    return db.query(
        `SELECT * FROM topics`
    )
    .then(topics => {
        return topics.rows
    })
}

const fetchArticles = (sort_by = 'created_at', order = 'desc') => { //sort_by the column, order arranges the column in descending order
    return db.query(
        `SELECT articles.*, count(comments.comment_id) AS comment_count
        FROM articles 
        LEFT JOIN comments 
        ON articles.article_id = comments.article_id 
        GROUP BY articles.article_id
        ORDER BY ${sort_by} ${order}`
    )
    .then(articles => {
        return articles.rows
    })
}

const fetchArticleById = (article_id) => {
    return db.query(
        `SELECT articles.author,
        articles.title, 
        articles.article_id, 
        articles.body, 
        articles.votes, 
        articles.topic, 
        articles.created_at, 
        votes, 
        article_img_url 
        FROM articles
        WHERE articles.article_id = $1`, [article_id]
    )
    .then(result => {
        const article = result.rows;
        if (article.length === 0) {
            return Promise.reject({ status: 404, msg: 'Article not found' })
        }
        return article[0]
    })
}

const fetchCommentsByArticleId = (article_id) => {
    return db.query(
        `SELECT comments.comment_id,
        comments.votes,
        comments.created_at,
        comments.author,
        comments.body,
        comments.article_id
        FROM comments
        WHERE comments.article_id = $1
        ORDER BY comments.created_at DESC`, [article_id]
    )
    .then(result => {
        const comments = result.rows;
        if (comments.length === 0) {
            return Promise.reject({ status: 404, msg: 'Comments not found' })
        }
        return comments
    })
}

module.exports = { fetchTopics, fetchArticles, fetchArticleById, fetchCommentsByArticleId };
