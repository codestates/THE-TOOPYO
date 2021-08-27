const { user } = require('../../models/user');

module.exports = (req, res) => {
    const { nickName, email, password, mobile, picture, provider } = req.body;

    user.findOne({ where: { email: email } }).then((emailConflict) => {
        if (emailConflict) {
            res.status(409).json({ message: 'email exist' })
        }
        user.create({ nickName, email, password, mobile, picture, provider })
        .then((success) => {
            res.status(201).json({ message: 'ok' });
        })
    })
};
