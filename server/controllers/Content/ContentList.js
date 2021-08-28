const { content } = require('../../models');
const { user } = require('../../models');

module.exports = {
    // 모든 게시물 보기입니다.
    allContent: (req, res) => {},
    // 특정 게시물 보기입니다.
    detailContent: async (req, res) => {
        const { id } = req.params;
        const { email } = req.body;
        if (req.body !== undefined && req.params.id !== undefined) {
            const findContent = await content.findOne({
                where: {
                    id,
                },
            });
            const findUser = await user.findOne({
                where: {
                    email,
                },
            });
            res.status(200).json({
                message: 'ok',
                data: {
                    content: {
                        title: findContent.title,
                        picture_1: findContent.picture_1,
                        picture_2: findContent.picture_2,
                        description: findContent.description,
                        voting_deadline: findContent.voting_deadline,
                        createdAt: findContent.createdAt,
                        updateAt: findContent.updatedAt,
                    },
                    writer: {
                        id: findUser.id,
                        nickName: findUser.nickName,
                        profile_img: findUser.profile_img,
                    },
                },
            });
        } else {
            res.status(404).json({
                message: 'Content Not Found',
            });
        }
    },

    // 게시물 생성입니다.
    createContent: (req, res) => {},
    // 게시물 수정입니다.
    retouchContent: (req, res) => {},
    // 게시물 삭제입니다.
    deleteContent: (req, res) => {},
};
