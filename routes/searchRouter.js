const { urlencoded } = require('body-parser');
var express = require('express');
var router = express.Router();
const request = require('request');

const apiKey = '1fb720b97cc13e580c2c35e1138f90f8';
const apiBaseUrl = 'http://api.themoviedb.org/3';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';

// /search/...
// Actor 검색어에 띄어쓰기 있으면 충돌나나?
router.post('/', (req, res, next) => {
    const searchTerm = encodeURI(req.body.movieSearch)
    const category = req.body.category;

    let searchCategory;
    if(category === 'movie') {
        searchCategory = 'movie'
    } else if(category === 'actor') {
        searchCategory = 'person'
    }

    request.get(`${apiBaseUrl}/search/${searchCategory}?query=${searchTerm}&api_key=${apiKey}`, (error, response, searchData) => {
        if(error) {
            console.log(error)
        }
        if(searchCategory === 'person') {
            const parsedData = JSON.parse(searchData)
            if(parsedData.total_results == 0) {
                return res.render('noSearchResult', {
                    searchTerm: decodeURI(searchTerm),
                })
            }
            // res.json(parsedData)
            res.render('search', {
                person: true,
                parsedData: parsedData.results[0].known_for,
                searchTerm: decodeURI(searchTerm),
            })
        } else if(searchCategory === 'movie') {
            const parsedData = JSON.parse(searchData).results
            // res.json(parsedData)
            res.render('search', {
                person: false,
                parsedData,
                searchTerm: decodeURI(searchTerm),
            })
        }
        // console.log('response ===============')
        // console.log(response)
        // console.log('data==============')
        // console.log(searchData)
    })
    })



module.exports = router;