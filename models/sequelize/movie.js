module.exports = (sequelize, Sequelize) => {
  const Movie = sequelize.define("movie", {
    backdrop_path: {
      type: Sequelize.STRING
    },
    poster_path: {
      type: Sequelize.STRING
    },
    overview: {
      type: Sequelize.TEXT
    },
    title: {
      type: Sequelize.STRING
    },
    original_title: {
      type: Sequelize.STRING
    },
    genres: {
      type: Sequelize.STRING
    },
    adult: {
      type: Sequelize.BOOLEAN
    },
    video: {
      type: Sequelize.BOOLEAN
    },
    original_language: {
      type: Sequelize.STRING
    },
    title: {
      type: Sequelize.STRING
    },
    vote_average: {
      type: Sequelize.FLOAT
    },
    popularity: {
      type: Sequelize.FLOAT
    },
    vote_count: {
      type: Sequelize.INTEGER(10).UNSIGNED
    },
    release_date: {
      type: Sequelize.STRING
    }
  });
  return Movie;
};
