const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'CRUD_Database'
});

const portNum = 3001

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/get', (req, res)=>{
    const sqlSelect = "SELECT * FROM movie_reviews";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
})

app.post('/api/insert', (req, res)=>{
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    const sqlInsert = "INSERT INTO movie_reviews (movie_name, movie_review) VALUES (?,?);"
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        // console.log(result);
    });
})

app.delete('/api/delete/:movieName', (req, res) => {
    const movieName = req.params.movieName;
    const sqlDelete = "DELETE FROM movie_reviews WHERE movie_name = ?";
    db.query(sqlDelete, [movieName], (err, result) => {
        if (err) console.log(err);
        // console.log("Deleting movie review");
    });
});

app.put('/api/update', (req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    const sqlUpdate = "UPDATE movie_reviews SET movie_review = ? WHERE movie_name = ?";
    db.query(sqlUpdate, [movieReview, movieName], (err, result) => {
        if (err) console.log(err);
        // console.log("Updating movie review with name: " + movieName + " and review: " + movieReview);
    });
});

app.listen(portNum, ()=>{
    console.log('Running on port: ', portNum);
});