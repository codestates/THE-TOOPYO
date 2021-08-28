module.exports = (req, res) => {
    //!나중에 session으로 변경해야함
    // if (!req.body.email) {
    //     res.status(400).json({ message: 'You`re currently not loged in' });
    // } else {
    req.session.destroy();
    res.status(200).json({ message: 'Successfully sign out!' });
    //}
};
