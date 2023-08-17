const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        varChar: 280
    },
    createdAt: {
        date: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
    },

    reactions: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

model.exports = Thought;