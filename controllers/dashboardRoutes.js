const router = require("express").Router();
const { Post, User, Rating } = require('../models');
//const { findAll } = require("../models/User");
const withAuth = require('../utils/auth');
//const { route } = require("./homeRoutes");
const Sequelize = require('sequelize');

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
        const posts = await Post.findAll({             
            include: [                                
                {
                    model: User,
                },
                {
                    model: Rating, as: 'RatingMain',
                    attributes: ['likes'],
                    required: false,
                    where: {
                        'user_id' : req.session.user_id
                    },
                },
                {
                    model: Rating, as: 'RatingHelper',
                    attributes: ['post_id', [Sequelize.fn('count', Sequelize.col('RatingHelper.likes')), 'total']],
                    required: false,
                },
            ],
            group: ['Post.id'],           
        });            
        const allPosts = posts.map((post) => post.get({ plain: true }));
        
        allPosts.forEach(i => {
            if (i.RatingHelper.length === 0) {
                i.RatingHelper = [{total: 0}];
            }
        });        
        allPosts.sort((a,b) => b.RatingHelper[0].total - a.RatingHelper[0].total);

        res.render('allPosts', {
            layout: 'dashboard',
            allPosts,
            logged_in: req.session.logged_in,
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
                include: [
                    {
                        model: User,
                    },
                    {
                        model: Rating, as: 'RatingMain',
                        attributes: ['likes'],
                        required: false,
                        where: {
                            'user_id' : req.session.user_id,
                        }
                    },
                    {
                        model: Rating, as: 'RatingHelper',
                        attributes: ['post_id', [Sequelize.fn('sum', Sequelize.col('RatingHelper.likes')), 'total']],
                        required: false,
                    },
                ],
                group: ['Post.id'],
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