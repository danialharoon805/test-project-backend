

const {
  UserHandler,
  NewsPostHandler
} = require('../../handlers');

class NewsPostManager {

  static async createPost (data) {

    console.log(`createPost:: Request to create post. data:: `, data);

    let user = await UserHandler.findUserByEmail(data && data.email);

    let post = await NewsPostHandler.createPost(user && user.id, data);

    post = await NewsPostHandler.findPostbyId(post);

    console.log(`createPost:: Post successfully created. user:: `, post);

    return post;

  }

  static async getAllPosts () {

    console.log(`getAllPosts:: Request to get all post.`);

    let posts = await NewsPostHandler.getPosts();

    for (let i = 0; i < posts.length; i++) {

      let user = await UserHandler.findUserById(posts[i].user_id);

      let views = await NewsPostHandler.getViewsOfPost(posts[i].id);
      
      let likes = await NewsPostHandler.getLikesOfPost(posts[i].id);

      posts[i].user = user;
      posts[i].views = views[0].views || 0;
      posts[i].likes = likes[0].likes || 0;

    }

    console.log(`getAllPosts:: Post successfully fetched. user:: `, posts);

    return posts;

  }

  static async addView (data) {

    console.log(`addView:: Request to add view post.`);

    let view = await NewsPostHandler.getViewByUniqueId(data.unique_user_id, data.post_id);

    if (!view) {

      view = await NewsPostHandler.createView(data);

      console.log('addView:: View Added');

      const views = await NewsPostHandler.getViewsOfPost(data.post_id);

      return views[0];

    }

    let viewDate = new Date(view.viewed_at);

    viewDate.setDate(viewDate.getDate() + 1);

    if (viewDate < new Date()) {

      await NewsPostHandler.addView(view.id, view.views)

      console.log('addView:: View Added');

      const views = await NewsPostHandler.getViewsOfPost(data.post_id);

      return views[0];

    }

    console.log(`addView:: already viewed. `);

    const views = await NewsPostHandler.getViewsOfPost(data.post_id);

    return views[0];

  }

  static async addLike (data) {

    console.log(`addLike:: Request to add like post.`);

    let like = await NewsPostHandler.getLikeByUniqueId(data.unique_user_id, data.post_id);

    if (!like) {

      like = await NewsPostHandler.createLike(data);

      console.log('addLike:: Like Added');

      const likes = await NewsPostHandler.getLikesOfPost(data.post_id);

      return likes[0];

    }

    let likeDate = new Date(like.liked_at);

    likeDate.setDate(likeDate.getDate() + 1);

    if (likeDate < new Date()) {

      await NewsPostHandler.addLike(like.id, like.likes)

      console.log('addLike:: Like Added');

      const likes = await NewsPostHandler.getLikesOfPost(data.post_id);

      return likes[0];

    }

    console.log(`addLike:: already liked. `);

    const likes = await NewsPostHandler.getLikesOfPost(data.post_id);

    return likes[0];

  }

}

module.exports = NewsPostManager;
