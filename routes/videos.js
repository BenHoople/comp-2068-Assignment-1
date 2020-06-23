const { index, show, new: _new, create, edit, update, delete: _delete } = require('../controllers/VideoController');

module.exports = router => {
    router.get('/videos', index);
    router.get('/videos/_new', _new);
    router.post('/videos', create);
    router.post('/videos/update', update);
    router.post('/videos/_delete', _delete);
    router.get('/videos/:id/edit', edit);
    router.get('/videos/:id', show);
};