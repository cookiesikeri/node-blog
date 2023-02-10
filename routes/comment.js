module.exports = function({ app, dbConn }) {
    app.post('/reactions/get', (req, res) => {
        const { post_id, user_id } = req.body;
        if (!post_id || !user_id) {
            res.status(404).jsonp({ message: 'Not found' });
        }
        const getReactionSql = "SELECT * FROM post_reaction WHERE post_id = ? AND user_id = ?";
        dbConn.query(getReactionSql, [post_id, user_id], function(error, response) {
            if (response && response.length) {
                res.status(200).jsonp({...response[0] });
            } else {
                res.status(404).jsonp({ message: 'Not found' });
            }
        });
    });

    app.post('/comment/create', (req, res) => {
        const { postId, userId, Comment } = req.body;
        if (!postId || !userId || !Comment) {
            res.status(500).jsonp({ message: 'Cannot comment the post reaction, please try again' });
        }
        const comments = [
            [postId, userId, Comment]
        ];
        const insertcommentql = "INSERT INTO comments (post_id, user_id, comment) VALUES ?";
        dbConn.query(insertcommentql, [comments], function(error, insertedComment) {
            if (insertedComment) {
                res.status(200).jsonp({ insertId: insertedComment.insertId, post_id: postId, user_id: userId, comment: Comment });
            } else {
                res.status(500).jsonp({ message: 'Cannot comment right, please try again later' });
            }
        });
    });

    app.post('/comment/delete', (req, res) => {
        const { postId, userId } = req.body;
        if (!postId || !userId) {
            res.status(404).jsonp({ message: 'no comment for this post' });
        }
        const deleteReactionsSql = "DELETE FROM comments WHERE post_id = ? AND user_id = ?";
        dbConn.query(deleteReactionsSql, [postId, userId], function(error, response) {
            if (response && response.affectedRows) {
                res.status(200).jsonp({ postId, userId });
            } else {
                res.status(500).jsonp({ message: 'Cannot delete comment, please try again' });
            }
        });
    });
}