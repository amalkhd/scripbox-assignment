const Joi = require("joi");
const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    }
}, { timestamps: { createdAt: 'created_at' } });
const Challenge = mongoose.model("Challenge", challengeSchema);

function validate(challenge) {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        tags: Joi.array().required()
    });

    return schema.validate(challenge);
}

exports.customerSchema = challengeSchema;
exports.Challenge = Challenge;
exports.validateChallenge = validate;
