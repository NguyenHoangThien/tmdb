const db = require("../models/sequelize");
const Movie = db.movies;

module.exports = {
  getLists: (req, res, next) => {
    let { page } = req.query;
    if (!Number(page)) {
      page = 1;
    };

    const limit = 20;
    const offset = (page - 1) * limit;

    Movie.findAll({
      order: [
        ['popularity', 'DESC']
      ],
      limit,
      offset
    })
    .then(data => {
      res.json({
        succes: true,
        results: data
      });
    }).catch(error => {
      res.status(500).json({
        succes: false,
        msg: error.messsage
      })
    });
  },

  getDetails: (req, res, next) => {
    const { id } = req.params;
    if (!Number(id)) {
      return res.status(500).json({
        succes: false,
        msg: 'Bad Request'
      });
    }

    Movie.findOne({
      where: { id }
    })
    .then(data => {
      res.json({
        succes: true,
        results: data
      });
    }).catch(error => {
      res.status(500).json({
        succes: false,
        msg: error.messsage
      })
    });
  }
}
