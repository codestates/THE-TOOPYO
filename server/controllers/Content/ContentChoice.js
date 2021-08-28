const { content } = require('../../models');
const { user } = require('../../models');
const { agree } = require('../../models');
const { disagree } = require('../../models');

module.exports = {
    // 찬성버튼을 눌렀을때 입니다.
    agree: async (req, res) => {
        const findContent = await content.findOne({ where: { id: req.params.id } });
        const findUser = await user.findOne({ where: { email: req.body.email } });
        try {
            if (findContent && findUser) {
                const a = await agree.create({ userId: findUser.id, contentId: findContent.userId });
                res.status(200).json({ message: 'agree complete', agree: a });
            } else {
                res.status(400).json({ message: '?????' });
            }
        } catch (err) {
            console.log(new Error(err));
        }
    },
    // 반대버튼을 눌렀을때 입니다.
    disagree: (req, res) => {},
};
