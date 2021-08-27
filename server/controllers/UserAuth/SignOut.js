module.exports = (req, res) => {
    if (!req.session.email) {
        res.status(400).json({ message: 'You`re currently not loged in' });
    } else {
        req.session.destroy();
        res.json({ message: 'ok' });
    }
};
