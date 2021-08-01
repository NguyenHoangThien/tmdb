const axios = require('axios');
const { apiEndPoint, apiKey } = require('../config/tmdb_api_key');
const db = require("../models/sequelize");
const Movie = db.movies;

const fetchDataAndInsertToDB = (page = 1, genresData) => {
  axios.get(`${apiEndPoint}4/discover/movie`, {
    params: {
      api_key: apiKey,
      sort_by: 'popularity.desc',
      page
    }
  })
  .then(function (response) {
    const { results } = response.data;
    const insertData = results.map(item => {
      const { genre_ids } = item;
      genres = genre_ids.map(id => genresData[id]).join(', ');
      return {
        ...item,
        genres
      }
    })
    Movie.bulkCreate(insertData);
  })
  .catch(function (error) {
    console.log('Error at page', page);
  })
  .then(function () {
    // always executed
  });
}

const fetchGenre = () => new Promise((resolve, reject) => {
  axios.get(`${apiEndPoint}/3/genre/movie/list`, {
    params: {
      api_key: apiKey
    }
  })
  .then(function (response) {
    const { genres } = response.data;
    const results = {};
    genres.forEach(i => {
      results[i.id] = i.name
    });
    resolve(results);
  })
  .catch(function (error) {
    console.log('fetchGenre error')
  })
})


const main = async () => {
  await Movie.destroy({ truncate : true, cascade: false });
  const genres = await fetchGenre();
  for (i = 1; i < 500; i++) {
    fetchDataAndInsertToDB(i, genres);
  }
}

module.exports = main;