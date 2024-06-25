const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema(
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

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_lenght: 1,
            max_length: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
}
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reaction.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;