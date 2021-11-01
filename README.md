# test-project-backend

npm install

configure db in config default.json

create database test_project in sql

set user and password

npm start

4 tables

users: to store user data

news_posts: to store posts of users

views: to store posts and their views and people who viewed the posts. With this we can stop user to view more than once a day

likes: to store posts and their likes and people who liked the posts. With this we can stop user to like more than once a day

6 Apis

Sign up : register a new user

Sign in : sign in user

Create Post : create a news post it will get email heading and description of news in body.

Get posts : Fetch all posts to show on front page

Add views : When a user see the post his unique id and view time will be added here and we will check that he will not be able to add more views for next 24 hours on a particular post. Return views on that particuar post

Add likes : When a user likes the post his unique id and like time will be added here and we will check that he will not be able to add more likes for next 24 hours on a particular post. Return ;likes on that particular post.
