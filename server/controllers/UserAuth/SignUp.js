const { user } = require('../../models');

module.exports = async (req, res) => {
    console.log(req.file);
    const { nickName, email, password, phoneNumber, profile_img } = req.body;
    // const profile_img = req.file;

    try {
        const userCheck = await user.findOne({ where: { email: email } });
        if (userCheck) {
            res.status(409).json({ message: 'email exist' });
        } else if (nickName && email && password && phoneNumber) {
            const findNickname = await user.findOne({
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
                res.status(500).json({ message: 'please, rewrite nickname' });
            }
        } else {
            res.status(404).json({ message: 'please, rewrite' });
        }
    } catch (err) {
        res.status(500).json({ message: 'server error' });
    }
};
