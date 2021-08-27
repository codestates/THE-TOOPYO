const { content } = require('../../models');

module.exports = {
    // 모든 게시물 보기입니다.
    allContent: (req, res) => {},
    // 특정 게시물 보기입니다.
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
    createContent: (req, res) => {},
    // 게시물 수정입니다.
    retouchContent: (req, res) => {},
    // 게시물 삭제입니다.
    deleteContent: (req, res) => {},
};
