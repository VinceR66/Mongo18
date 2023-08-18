
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


}


module.exports = thoughtController;
