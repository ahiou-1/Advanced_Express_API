var express = require('express');
var router = express.Router();
const request = require('request');

const apiKey = '1fb720b97cc13e580c2c35e1138f90f8';
const apiBaseUrl = 'http://api.themoviedb.org/3';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';


// /movies/...
router.get('/:movieId', (req, res, next) => {
  const movieId = req.params.movieId;
  request.get(`${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`, (error, response, movieData) =>{
    if(error) {
      console.log(error)
    }
    const chosenMovie = JSON.parse(movieData)
    res.render('movies', {
      chosenMovie
    })
    // res.json(chosenMovie)
  })
  
})




module.exports = router;
