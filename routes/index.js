const db = require("../models");
const Movie = db;
const uploadController = require("../controller/upload");

module.exports = function (app) {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/upload", (req, res, next) => {
    const movie = new Movie({
      moviename: req.body.moviename,
      releaseyear: req.body.releaseyear,
      language: req.body.language,
      thumbnail: req.body.thumbnail,
      video: req.body.video
    });
    movie.save((err) => {
      if (err) {
        res.json({ error: err });
        return;
      }

      res.status(200).json({ success: true });
    });
  }); 

  app.post("/uploadthumbnail", uploadController.uploadThumbnail);
  
  app.post("/uploadvideo", uploadController.uploadVideo);
    
  app.get("/movies", (req, res, next) => {
    Movie.find()
      .exec((err, movies) => {
        if (err) {
        return res.status(400).json({error:err})
        }
        res.status(200).json({success: true, movies})
    })
  });
};
