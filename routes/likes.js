const express = require("express");
const router = express.Router();
const { getPagination } = require("../util/common");
const { Like, validateLike } = require("../models/like");
const { Challenge } = require("../models/challenge");



router.get("/", async (req, res) => {
    const likes = await Like.find();
    res.send({
      status: true,
      data: likes
    })
});


  router.post("/", async (req, res) => {
    const { error } = validateLike(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let challenge = await Challenge.findById(req.body.challengeId);
    if (!challenge) return res.status(404).send("Invalid challenge ID");

    const exist = await Like.findOne({challenge:req.body.challengeId, customer:req.body.userId})
    if(exist) return res.status(409).send("Already upvoted");
    
    let like = new Like({
        challenge: {
            _id:req.body.challengeId
        },
        customer:{
            _id:req.body.userId
        }
    });
  
    like = await like.save();

    challenge = await Challenge.findByIdAndUpdate(
      req.params.id,
      {
        likes: +challenge.likes + 1,
      },
      { new: true }
    );
  
    res.send({
      status: true,
      data: challenge,
    });
  });

  module.exports = router;
