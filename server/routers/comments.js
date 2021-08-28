const router = require('express').Router();
const controllers = require('../controllers/comments');

/* ================================
          /comments
================================ */
router.get('/events/:event_id', controllers.getComments);
router.post('/events/:event_id', controllers.createComment);
router.patch('/:comment_id', controllers.updateComment);

module.exports = router;
