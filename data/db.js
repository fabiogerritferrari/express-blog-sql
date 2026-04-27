const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost:3306',
    user: 'root',
    password: 'Luglio1997!',
    database: 'blog_sql'
});

connection.connect((err) => {

    if (err) throw err;
    console.log('connected to db: blog_sql')
});

module.exports = connection;