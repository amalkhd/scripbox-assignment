const express = require("express");
const router = express.Router();
const { Challenge, validateChallenge } = require("../models/challenge");
const { Customer, } = require("../models/customer");


router.get("/", async (req, res) => {
  const { pageNum} = req.query;
  const _id =  req.header('x-auth-token');

  let challenge = await Challenge.aggregate([
    {
      $lookup:
      {
        from: "likes",
        localField: "_id",
        foreignField: "challenge",
        as: "hasLiked"
      }
    },
    {
      $sort: { _id: -1 }
    }
  ]);

  const customer = await Customer.findOne({ _id });
  if (customer) {
    challenge = filterLike(customer._id, challenge);
  }
  res.send({
    status: true,
    data: challenge
  });
});

router.post("/", async (req, res) => {
  const { error } = validateChallenge(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let challenge = new Challenge(req.body);

  challenge = await challenge.save();

  res.send({
    status: true,
    data: challenge,
  });
});



router.delete("/:id", async (req, res) => {
  const challenge = await Challenge.findByIdAndRemove(req.params.id);
  if (!challenge) return res.status(404).send("Invalid product id");
  res.send({
    status: true,
    data: challenge,
  });
});


function filterLike(id, challenge){
  return challenge.map(ch => {
    ch.hasLiked = ch.hasLiked.filter(item => {
      return item.customer.toString() === id.toString()
    });
    return ch;
  })
}

module.exports = router;

