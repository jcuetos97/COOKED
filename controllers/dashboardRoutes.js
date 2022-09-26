const router = require("express").Router();
const { Post, User, Rating } = require('../models');
const { findAll } = require("../models/User");
const withAuth = require('../utils/auth');
const { route } = require("./homeRoutes");

router.get('/myposts', withAuth, async (req,res) => {
    try {
        const allPost = await Post.findAll({
            where: { 
                user_id: req.session.user_id 
            }, 
            include: [User],
            order: [['created_at', 'DESC']],
        });
  
        const userPosts = allPost.map((post) => post.get({ plain: true }));
        res.render('userPosts', {
            layout: 'dashboard',
            userPosts,
        });
    } catch (err) {
        console.log(err);
        res.redirect('login');
    } 
});

router.get('/trending', withAuth, async (req, res) => {
    try {
        const trendPosts = await Post.findAll({
            order: [[Rating, 'likes', 'DESC']],
            include: [User, Rating],
        });
        const allPosts = trendPosts.map((post) => post.get({ plain: true }));
        
        res.render('allPosts', {
            layout: 'dashboard',
            allPosts,
        });

    } catch (err) {
        console.log(err);
        res.redirect('login')
    }
});

router.get('/category/:category', withAuth, async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            where: {
                category: req.params.category
            },
            include: [User],
            order: [['created_at', 'DESC']],
        });

        const catPosts = allPosts.map((post) => post.get({ plain: true }));
        res.render('categoryPosts', {
            layout: 'dashboard',
            catPosts,
        });

    } catch (err) {
        console.log(err);
        res.redirect('login');
    }
});

router.get("/new", withAuth, (req, res) => {
    res.render("newPost", {
        layout: "dashboard"
    });
});

router.get("/edit/:id", withAuth, async (req, res) => {
    try {

        const postData  =  await Post.findByPk(req.params.id);
        const post = postData.get({ plain: true });
        res.render("editPost", {
            layout: "dashboard",
            post
        });
     } catch (err) {
         console.log(err);
         res.redirect("login");
     } 
   });

module.exports = router;