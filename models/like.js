const Joi = require("joi");
const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge',
        required: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
});

const Like = mongoose.model("Like", likeSchema);

function validate(like) {
    const schema = Joi.object({
        challengeId: Joi.string().required(),
        userId: Joi.string().required(),
    });

    return schema.validate(like);
}

exports.likeSchema = likeSchema;
exports.Like = Like;
exports.validateLike = validate;