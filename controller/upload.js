const upload = require("../middleware/upload");

const uploadThumbnail = async (req, res) => {
  try {
    await upload.uploadThumbnailFile(req, res);

    if (req.file == undefined) {
      return res.json({ error: `You must select a file.` });
    }

    return res.json({success:true, filepath: res.req.file.path, filename: res.req.file.filename});
  } catch (error) {
    return res.json({ error: `Error when trying upload thumbnail: ${error}` });
  }
};

const uploadVideo = async (req, res) => {
  try {
    await upload.uploadVideoFile(req, res);

    if (req.file == undefined) {
      return res.json({error:`You must select a file.`});
    }

    return res.json({success:true, filepath: res.req.file.path, filename: res.req.file.filename});
  } catch (error) {
    return res.json({error:`Error when trying upload video: ${error}`});
  }
};

module.exports = {
    uploadThumbnail,
    uploadVideo
};
