const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionsSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default:
        },
}
)