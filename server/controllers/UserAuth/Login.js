const { users } = require('../../models');

module.exports = (req, res) => {
    const { email, password } = req.body;
    users
        .findOne({
            where: {
                email,
                password,
            },
        })
        .then((data) => {
            if (!data) {
                return res.status(401).json({ message: 'Invalaid user' });
            } else {
                req.session.save(function () {
                    req.session.email = users.email;
                    return res.status(200).json({ message: 'ok' });
                });
            }
        });
};
