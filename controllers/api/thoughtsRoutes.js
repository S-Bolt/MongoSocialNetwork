const { Thoughts, User } = require('../../models');

module.exports = {
    //Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thoughts.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
     //Get a single thought by id
     async getSingleThought(req, res) {
        try {
            const thought = await Thoughts.findOne({
                _id: req.params.thoughtsId
            })
            .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thoughts with Id found'})
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
     //Create new thought
     async createThought(req, res) {
        try {
            const thought = await Thoughts.create(req.body);
            await User.findOneAndUpdate(
                {_id: req.body.userId},
                {$push: {thoughts: thoughts.id }},
                {new: true}
            );
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
     //Update thought
     async updateThought(req, res) {
        try {
            const updatedThought = await Thoughts.findOneAndUpdate(
                {_id: req.params.id},
                req.body,
                { new: true, runValidators: true}
            );

            if (!updatedThought) {
                return res.status(404).json({ message: 'No thought with this id!'})
            }
            res.json(updatedThought)
        } catch (err) {
            res.status(500).json(err);
        }
    },
     //Delete a thought
     async deleteThought(req, res) {
        try {
            const deletedThought = await Thoughts.findOneAndDelete({
                _id: req.params.thoughtsId
            });

            if (!deletedThought) {
                res.status(404).json({
                    message: 'No thought with that Id!'
                });
            }

            await User.findOneAndUpdate(
                { username: thought.username },
                {$pull: { thoughts: req.params.id }}
            );

            res.json({ message: 'Thought deleted'});
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // add reaction to a thought
    async addReaction(req, res) {
        try {
            const thought = await Thoughts.findOneAndUpdate(
                {_id: req.params.thoughtsId},
                {$addToSet: { reactions: req.body} },
                {runValidators: true, new: true}
            );

            if(!thought) {
                return res.status(404).json({ message: 'No thought with this Id'});
            }
            res.json(thought)
        } catch (err) {
            res.status(500).json(err);
        }
    },
      // remove reaction from a thought
      async deleteReaction(req, res) {
        try {
            const thought = await Thoughts.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$pull: { reactions: {reactionId: req.params.reactionId}}}
            );

            if (!thought) {
                return res.status(400).json({ message: 'No thought with this Id!'})
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};
