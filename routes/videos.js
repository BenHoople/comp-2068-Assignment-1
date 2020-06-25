const { index, show, new: _new, create, edit, update, delete: _delete } = require('../controllers/VideoController');



function authorized (req, res, next) {
    if(!req.isAuthenticated()){
        req.flash('danger', 'You need to log in to do that!');
        return res.redirect('/videos');
    }
    next();
}

module.exports = router => {
    router.get('/videos', index);
    router.get('/videos/_new', authorized, _new);
    router.post('/videos', authorized, create);
    router.post('/videos/update', authorized, update);
    router.post('/videos/_delete', authorized, _delete);
    router.get('/videos/:id/edit', authorized, edit);
    router.get('/videos/:id', show);
};