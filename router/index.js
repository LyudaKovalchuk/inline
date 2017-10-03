const express = require('express'),
    router = new express.Router(),
    FilmCtrl = require('controllers').FilmCtrl;

router.post('/film/recommend', FilmCtrl.recommend);
router.get('/films/:title', FilmCtrl.getFilmsByTitle);

router.use((req, res, next) => res.sendStatus(404));

router.use((err, req, res, next) => {
    console.error(err);
    res.sendStatus(400);
});

module.exports = router;