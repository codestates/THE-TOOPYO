const { user } = require('../../models');

module.exports = async (req, res) => {
    const { nickName, email, password, phoneNumber, profile_img, provider } = req.body;
    try {
        const userCheck = await user.findOne({ where: { email: email } });
        if (userCheck) {
            res.status(409).json({ message: 'email exist' });
        } else if (nickName && email && password && phoneNumber && profile_img && provider) {
            user.create({ nickName, email, password, phoneNumber, profile_img, provider });
            res.status(201).json({ message: 'ok' });
        } else {
            res.status(404).json({ message: 'please, rewrite' });
        }
    } catch (err) {
        console.log(new Error(err));
    }
};
