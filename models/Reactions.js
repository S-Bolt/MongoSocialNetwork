const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const { Reactions } = require('.');

const reactionsSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            max_length: 200
        },
        username: {
            type: String,
            required: true,
        },
        CreatedAt: {
            type: Date,
            default: Date.now,
            get: creatAtVal => dateFormat(creatAtVal)
        }
},
{
    toJSON: {
        virtuals: true
    },
    id: false,
}
);

module.exports = Reactions();
