const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req,res) => {
    try {
        const posts = await Post.findAll({
           include: [User],
        });

        console.log('Posts de la DB');
        console.log(posts);
  
        const allPosts = posts.map((post) => post.get({ plain: true }));
   
        console.log(allPosts);

        res.render('allPosts', {
        layout: 'dashboard',
        allPosts,
        logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    } 
});


router.get('/welcome', (req,res) => {
    res.render('appWelcome', {
        layout: 'main'
    });
});

router.get('/signup', (req,res) => {
    res.render('signup', {
        layout: 'main'
    });
});

router.get('/login', (req,res) => {
    res.render('login', {
        layout: 'main'
    });
});


module.exports = router;