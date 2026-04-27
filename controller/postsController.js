const connection = require('./../data/db');


function index(req, res) {

    const posts = 'SELECT * FROM posts';

    connection.query(posts, (err, results) => {
        err && res.status(500).json({ error: 'database query failed' });
        res.json(results)

    })
};


function show(req, res) {
    const id = parseInt(req.params.id);

    const post = posts.find((post) => post.id === id)

    if (!post) {
        res.status(404)
        return res.json({
            error: 'not found',
            messaggio: 'oggetto non trovato'
        })
    }

    res.json(post);
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

    const post = posts.find((post) => post.id === id)

    if (!post) {
        res.status(404)
        return res.json({
            error: 'not found',
            messaggio: 'oggetto non trovato'
        })
    }

    posts.splice(posts.indexOf(post), 1);


    res.send('Cancellato il post ' + id);
    res.status(204)
};

module.exports = { index, show, store, update, modify, destroy };