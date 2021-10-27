const NewsPostManager = require('./NewsPostManager');

const {
  ErrorCodes,
  UserConstants
} = require('../../constants');

const {
  Validators
} = require('../../helpers');

class NewsPostController {

  static async createPost (req, res) {

    try {

      const post = await NewsPostManager.createPost(req.body);

      res.json({
        success: true,
        data: post
      });

    } catch (err) {

      console.log(`createPost:: Request to create post failed. data:: `, req.body, err);

      return res.status(err.code || ErrorCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.reportError ? err.message : UserConstants.MESSAGES.CREATE_POST_FAILED
      });

    }

  }

  static async getAllPosts (req, res) {

    try {

      const post = await NewsPostManager.getAllPosts();

      res.json({
        success: true,
        data: post
      });

    } catch (err) {

      console.log(`getAllPost:: Request to get all post failed. data:: `, req.body, err);

      return res.status(err.code || ErrorCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.reportError ? err.message : UserConstants.MESSAGES.GET_POST_FAILED
      });

    }

  }

  static async addView (req, res) {

    try {

      const post = await NewsPostManager.addView(req.body);

      res.json({
        success: true,
        data: post
      });

    } catch (err) {

      console.log(`addView:: Request to add view to post failed. data:: `, req.body, err);

      return res.status(err.code || ErrorCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.reportError ? err.message : UserConstants.MESSAGES.ADD_VIEW_FAILED
      });

    }

  }

  static async addLike (req, res) {

    try {

      const post = await NewsPostManager.addLike(req.body);

      res.json({
        success: true,
        data: post
      });

    } catch (err) {

      console.log(`addLike:: Request to add like to post failed. data:: `, req.body, err);

      return res.status(err.code || ErrorCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.reportError ? err.message : UserConstants.MESSAGES.ADD_LIKE_FAILED
      });

    }

  }

}

module.exports = NewsPostController;
