const { content } = require('../../models');
const { user } = require('../../models');

module.exports = {
    // 모든 게시물 보기입니다.
    allContent: async (req, res) => {
      try {
            const contentData = await content.findAll({
                include: user,
                attributes: ['id', 'title', 'picture_1', 'picture_2', 'description', 'voting_deadline'],
            });
            res.status(200).json({ message: 'ok', content: contentData });
        } catch (err) {
            console.log(new Error(err));
        }
    },
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
    createContent: (req, res) => {
        try {
            const { userId, title, picture_1, picture_2, description, voting_deadline } = req.body;
            if (userId && title && picture_1 && picture_2 && description && voting_deadline) {
                content.create({ userId, title, picture_1, picture_2, description, voting_deadline }).then(() => {
                    res.status(201).json({ message: 'ok' });
                });
            } else {
                res.status(400).json({ message: 'please, rewrite' });
            }
        } catch (err) {
            console.log(new Error(err));
        }
    },

    // 게시물 수정입니다.
    retouchContent: async (req, res) => {
        const findUser = await user.findOne({ where: { email: req.body.email } }); //! 나중에 req.session.emaiil로 변경해야함
        const findContent = await content.findOne({ where: { id: req.params.id } });
        const { title, picture_1, picture_2, description } = req.body;
        try {
            if (!findUser) {
                res.status(401).json({ message: 'not user session' });
            } else if (findUser.id === findContent.userId && title && picture_1 && picture_2 && description) {
                content.update({ title, picture_1, picture_2, description }, { where: { id: req.params.id } });
                const contentUpdate = await content.findOne({ where: { id: req.params.id } });
                res.status(200).json({ message: 'content update success', data: contentUpdate });
            } else {
                res.status(401).json({ message: 'not authorization' });
            }
        } catch (err) {
            console.log(new Error(err));
        }
    },

    // 게시물 삭제입니다.
    deleteContent: async (req, res) => {
        const findUser = await user.findOne({ where: { email: req.body.email } }); //! 나중에 req.session.emaiil로 변경해야함
        const userId = findUser.id;
        const findContent = await content.findOne({ where: { id: req.params.id } });
        const contentId = findContent.userId;
        try {
            if (!findUser) {
                res.status(400).json({ message: 'not user session' });
            } else if (userId === contentId) {
                content.destroy({ where: { id: deleteId } });
                res.status(200).json({ message: 'delete complete' });
            } else {
                res.status(401).json({ message: 'not authorization' });
            }
        } catch (err) {
            console.log(new Error(err));
        }
    },
};
