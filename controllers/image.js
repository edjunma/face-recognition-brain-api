const Clarifai = require("clarifai");

// You must add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: "147046a299a541b4902c4001df6535a2"
});

const handleApiCall = (req, res) => {
  app.models
    .predict("147046a299a541b4902c4001df6535a2", req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json("Unable to connect to API"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json("unable to get entries"));
};

module.exports = {
  handleImage,
  handleApiCall
};
