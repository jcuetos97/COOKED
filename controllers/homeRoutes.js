const router = require('express').Router();
const { Post, Comment, User, Rating } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req,res) => {
    try {
        const posts = await Post.findAll({
           include: [User],   
           order: [['created_at', 'DESC']],
        });
    
        const allPosts = posts.map((post) => post.get({ plain: true }));          
        res.render('allPosts', {
        layout: 'dashboard',
        allPosts,
        logged_in: req.session.logged_in,
        });

    } catch (err) {
        res.status(500).json(err);
    } 
});

router.get('/post/:id', async (req, res) => {
    try {
        const onePost  = await Post.findByPk(req.params.id, {
            include: [
              User,
              {
                model: Comment,
                include: [User],
              },
            ],
          })

        const post = onePost.get({ plain: true });
      
        res.render('singlePost', { 
            layout: 'dashboard',
            post 
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