
const { Thought, User } = require('../models');

const thoughtController = {

    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate({ _id: params.userId }, { $push: { thought: _id } }, { new: true });

            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thoughts with this ID!' });
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err));
    },

    getAllThoughts(req, res) {
        Thought.find({})
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            // .sort({_id: -1})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    getThoughtsById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thoughts with this particular ID!' });
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },


}

module.exports = thoughtController;
