const { Thoughts, User } = require('../../models');

module.exports = {
    //Get all Users
    async getUsers(req, res) {
        try {
            const users = await User.find().populate('thoughts');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //Get a single user by id
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({
                _id: req.params.userId
            })
            .select('-__v')
            .populate('thoughts');

            if (!user) {
                return res.status(404).json({
                    message: 'No user with that ID'
                });
            }

            res.json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a User
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete a User plus Thoughts
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({
                _id: req.params.userId
            });

            if (!user) {
                return res.status(404).json({ message: "No user with that ID"});
            }

            await Thoughts.deleteMany({
                _id: {$in: user.thoughts}
            });
            res.json ({ message: 'User and plus thoughts deleted.'})
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //update a user
    async updateUser(req, res) {
        try {
            const updateUser = await user.findOneAndUpdate(
                { _id: req.params.userId},
                {$set: req.body},
                { runValidators: true, new: true}
            );

            if (!updateUser) {
                res.status(404).json({ message: 'No user with this id!'})
            }

            res.json(updateUser);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};