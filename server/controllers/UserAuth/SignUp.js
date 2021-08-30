<<<<<<< HEAD
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
    }).catch (err) {
        console.log(err);
=======
const { user } = require('../../models');

module.exports = async (req, res) => {
    console.log(req.body);
    const { nickName, email, password, phoneNumber, profile_img } = req.body;
    try {
        const userCheck = await user.findOne({ where: { email: email } });
        if (userCheck) {
            res.status(409).json({ message: 'email exist' });
        } else if (nickName && email && password && phoneNumber && profile_img) {
            const findNickname = user.findOne({
                where: {
                    nickName,
                },
            });
            if (!findNickname) {
                user.create({
                    nickName,
                    email,
                    password,
                    phoneNumber,
                    profile_img,
                });
                res.status(201).json({ message: 'ok' });
            } else {
                res.status(404).json({ message: 'please, rewrite nickname' });
            }
        } else {
            res.status(404).json({ message: 'please, rewrite' });
        }
    } catch (err) {
        res.status(500).json({ message: 'server error' });
>>>>>>> 61110cdc8e7dac7f5addca3aafb7e2ab8e9f33c0
    }
};
