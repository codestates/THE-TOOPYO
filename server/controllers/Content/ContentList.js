const { content, user, agree, disagree, sequelize } = require('../../models');
const { QueryTypes } = require('sequelize');

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
    // !누구나 볼수있게 할까 /// 찬성, 반대 추가 보내줘야헤
    //! 내가 찬성, 반대 한거에대해 isAgree, isDisAgree로 응답보내줘야댐.
    detailContent: async (req, res) => {
        try {
            const { id } = req.params;
            // 아이디저장하자
            const { email } = req.body; //! session
            if (email !== undefined) {
                let contentUserList = await sequelize.query(
                    `
                    SELECT contents.userId, contents.title, contents.picture_1, contents.picture_2, contents.description,contents.voting_deadline, users.nickName, users.profile_img, COUNT(agrees.userId) AS agree,  COUNT(disagrees.userId) AS disagree FROM contents
                    LEFT JOIN agrees ON contents.id = agrees.contentId
                    LEFT JOIN disagrees ON disagrees.contentId = contents.id
                    JOIN users ON contents.userId = users.id
                    WHERE contents.id = ${id};
                    `,
                    { type: QueryTypes.SELECT },
                );
                console.log(contentUserList);
                const findUser = await user.findOne({ where: { email } });
                const checkAgree = await agree.findOne({ where: { userId: findUser.id, contentId: id } });
                const checkDisAgree = await disagree.findOne({ where: { userId: findUser.id, contentId: id } });
                if (checkAgree) {
                    contentUserList[0].checkAgree = true;
                } else {
                    contentUserList[0].checkAgree = false;
                }
                if (checkDisAgree) {
                    contentUserList[0].checkDisAgree = true;
                } else {
                    contentUserList[0].checkDisAgree = false;
                }
                res.status(200).json({ message: 'ok', data: contentUserList[0] });
            } else {
                res.status(404).json({
                    message: 'Content Not Found',
                });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'server error' });
        }
    },

    // 게시물 생성입니다.
    createContent: async (req, res) => {
        try {
            const { title, picture_1, picture_2, description, voting_deadline } = req.body;
            //! 나중에 session으로 바꿔야함
            const findUser = await user.findOne({ where: { email: req.body.email } });
            if (title && picture_1 && picture_2 && description && voting_deadline) {
                const createContent = await content.create({
                    userId: findUser.id,
                    title,
                    picture_1,
                    picture_2,
                    description,
                    voting_deadline,
                });
                res.status(201).json({ message: 'ok', contentId: createContent.id });
            } else {
                res.status(400).json({ message: 'please, rewrite' });
            }
        } catch (err) {
            res.status(500).json({ message: 'server error' });
        }
    },

    // 게시물 수정입니다.
    retouchContent: async (req, res) => {
        try {
            const findUser = await user.findOne({ where: { email: req.body.email } }); //! 나중에 req.session.emaiil로 변경해야함
            const findContent = await content.findOne({ where: { id: req.params.id } });
            const { title, picture_1, picture_2, description } = req.body;
            if (findUser.id !== findContent.userId) {
                return res.status(401).json({ message: 'not authorization' });
            }
            if (title && picture_1 && picture_2 && description) {
                await content.update({ title, picture_1, picture_2, description }, { where: { id: req.params.id } });
                res.status(200).json({ message: 'content update success' });
            }
        } catch (err) {
            res.status(500).json({ message: 'server error' });
        }
    },

    // 게시물 삭제입니다.
    deleteContent: async (req, res) => {
        try {
            const findUser = await user.findOne({ where: { email: req.body.email } }); //! 나중에 req.session.emaiil로 변경해야함
            const findContent = await content.findOne({ where: { id: req.params.id } });
            const contentUserId = findContent.userId;
            if (!findUser) {
                res.status(401).json({ message: 'not user session' });
            } else if (findUser.id !== contentUserId) {
                res.status(400).json({ message: 'not authorization' });
            } else if (findUser.id === contentUserId) {
                content.destroy({ where: { id: findContent.id } });
                res.status(200).json({ message: 'delete complete' });
            }

            // const findUser = await user.findOne({ where: { email: req.body.email } }); //! 나중에 req.session.emaiil로 변경해야함
            // if (findUser) {
            //     const userId = findUser.id;
            //     const findContent = await content.findOne({ where: { id: req.params.id } });
            //     const contentUserId = findContent.userId;
            //     if (userId !== contentUserId) {
            //         res.status(400).json({ message: 'not authorization' });
            //     } else if (userId === contentUserId) {
            //         content.destroy({ where: { id: findContent.id } });
            //         res.status(200).json({ message: 'delete complete' });
            //     }
            // } else {
            //     res.status(401).json({ message: 'not user session' });
            // }
        } catch (err) {
            res.status(500).json({ message: 'server error' });
        }
    },
};
