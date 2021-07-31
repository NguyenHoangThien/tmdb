module.exports = {
  getLists: (req, res, next) => {
    const data = [];
    res.json({
      succes: 200,
      data
    })
  },

  getDetails: (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    const data = [];
    res.json({
      succes: 200,
      data
    })
  }
}
