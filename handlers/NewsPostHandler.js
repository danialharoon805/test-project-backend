const {
  knex,
  Validators
} = require('../helpers');

class NewsPostHandler {

  static findPostbyId (postId) {

    return knex('news_post')
      .select('*')
      .where('id', postId)
      .first();

  }

  static getViewsOfPost (postId) {

    return knex('views')
      .sum('views as views')
      .where('post_id', postId);

  }

  static getLikesOfPost (postId) {

    return knex('likes')
      .sum('likes as likes')
      .where('post_id', postId);

  }

  static getPosts () {

    return knex.select('*').from('news_post').orderBy('id', 'desc');

  }

  static createPost (userId, data) {

    return knex('news_post')
      .insert({
        user_id: Validators.parseInteger(userId, -1),
        heading: data.heading,
        description: data.description,
      }).returning('*');

  }

  static createView (data) {

    return knex('views')
      .insert({
        post_id: data.post_id,
        views: 1,
        unique_user_id: data.unique_user_id,
        viewed_at: knex.fn.now()
      }).returning('*');

  }

  static createLike (data) {

    return knex('likes')
      .insert({
        post_id: data.post_id,
        likes: 1,
        unique_user_id: data.unique_user_id,
        liked_at: knex.fn.now()
      }).returning('*');

  }

  static getViewByUniqueId (id, postId) {

    return knex('views')
      .select('*')
      .where({
        unique_user_id: id,
        post_id: postId
      })
      .first();

  }

  static getLikeByUniqueId (id, postId) {

    return knex('likes')
      .select('*')
      .where({
        unique_user_id: id,
        post_id: postId
      })
      .first();

  }

  static addView (viewId, viewNo) {

    return knex('views')
      .where('id', Validators.parseInteger(viewId, -1))
      .update({
        views: viewNo + 1,
        viewed_at: knex.fn.now()
      })
      .returning('*');

  }

  static addLike (likeId, likeNo) {

    return knex('likes')
      .where('id', Validators.parseInteger(likeId, -1))
      .update({
        likes: likeNo + 1,
        liked_at: knex.fn.now()
      })
      .returning('*');

  }

}

module.exports = NewsPostHandler;
