const { user } = require('../../models');
const { content } = require('../../models');

module.exports = {
    // 내정보 입니다.
    mypage: async (req, res) => {
        //쿠키를 받아
        //해독해
        //해독한 값과 파인드원 한 값이 똑같은 데이터를 가져와
        //값이 똑같은 사람이 쓴 글들의 데이터도 가져와
        const { email } = req.body;
        if (req.body !== undefined) {
            const findUser = await user.findOne({
                where: {
                    email,
                },
            });
            const { id } = findUser;
            const findcontent = await content.findAll({
                where: {
                    userId: id,
                },
            });
            res.status(200).json({
                message: 'ok',
                data: {
                    content: findcontent,
                    userInfo: findUser,
                },
            });
        } else {
            res.status(404).json({ message: 'Bad Request' });
        }
    },
    // 내정보 수정입니다.
    retouchMypage: async (req, res) => {
        const { id } = req.params;
        const finduser = await user.findOne({
            where: {
                id,
            },
        });
        if (req.body.email === finduser.email) {
            await user.update(
                {
                    nickName: req.body.nickName,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                    profile_img: req.body.profile_img,
                },
                {
                    where: {
                        id,
                    },
                },
            );
            const userInfo = await user.findOne({
                where: {
                    id,
                },
            });
            res.status(200).json({
                message: 'ok',
                data: {
                    userInfo: userInfo,
                },
            });
        } else {
            res.status(400).json({ message: 'Bad Request' });
        }
    },
};
