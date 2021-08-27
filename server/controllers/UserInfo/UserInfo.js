module.exports = {
    // 내정보 입니다.
    mypage: (req, res) => {
        //쿠키를 받아
        //해독해
        //해독한 값과 파인드원 한 값이 똑같은 데이터를 가져와
        //값이 똑같은 사람이 쓴 글들의 데이터도 가져와
        if (req.session !== undefined) {
            res.status(200).json();
        }
    },
    // 내정보 수정입니다.
    retouchMypage: (req, res) => {},
};
