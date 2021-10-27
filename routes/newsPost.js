const express = require('express');

const NewsPostController = require('../app/newsPost/NewsPostController');

const router = express.Router();

router.post('/', NewsPostController.createPost);

router.get('/', NewsPostController.getAllPosts);

router.post('/add-view', NewsPostController.addView);

router.post('/add-like', NewsPostController.addLike);

module.exports = router;
