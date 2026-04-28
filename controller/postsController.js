const connection = require('./../data/db');


function index(req, res) {

    const posts = `SELECT * FROM posts`;

    connection.query(posts, (err, results) => {
        err && res.status(500).json({ error: 'database query failed' });
        res.json(results)

    })
};


function show(req, res) {
    const id = parseInt(req.params.id);

    const postSql = 'SELECT P.* FROM posts AS P WHERE P.id = ?';

    const tagSql = 'SELECT T.* FROM tags AS T JOIN post_tag AS PT ON PT.tag_id = T.id WHERE PT.post_id = ?';

    connection.query(postSql, [id], (err, results) => {
        err && res.status(500).json({ error: 'database query failed' });
        results.length === 0 && res.status(404).json({ error: 'post not found' });

        const post = results[0];

        connection.query(tagSql, [id], (err, tagsResults) => {
            err && res.status(500).json({ error: 'database query failed' });

            post.tag = tagsResults;

            res.json(post);
        })
    })
};


function store(req, res) {
    const newId = posts[posts.length - 1].id + 1;

    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    };

    posts.push(newPost);

    console.log(posts);

    res.status(200);
    res.send(newPost);
};


function update(req, res) {
    const id = parseInt(req.params.id);

    const post = posts.find((post) => post.id === id)

    if (!post) {
        res.status(404)
        return res.json({
            error: 'not found',
            messaggio: 'oggetto non trovato'
        })
    };

    post.title = req.body.title;
    post.content = req.body.content;
    post.image = req.body.image;
    post.tags = req.body.tags;

    console.log(posts);


    res.send(post);
};


function modify(req, res) {
    res.send('Modifica parziale del post ' + req.params.id);
};


function destroy(req, res) {
    const id = parseInt(req.params.id);

    const sql = 'DELETE FROM posts WHERE id=?'

    connection.query(sql, [id], (err) => {
        err && res.status(500).json({ error: 'database delete s query failed' });
        res.status(204);
        res.send(`post ${id} cancellato`);
    })
};

module.exports = { index, show, store, update, modify, destroy };