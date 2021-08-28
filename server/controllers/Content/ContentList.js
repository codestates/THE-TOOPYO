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

    //특정 게시물 보기입니다.
    detailContent: (req, res) => {
        const { id } = req.params.id;
        if (req.session !== undefined && req.params.id !== undefined) {
            content
                .findOne({
                    where: {
                        id,
                    },
                })
                .then((data) => {
                    return res.status(200).json({});
                });
        } else {
            return res.status(400).send();
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
