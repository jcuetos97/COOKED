const router = require("express").Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req,res) => {
    try {
        const allPost = await Post.findAll({
            where: { 
                user_id: req.session.user_id 
            }, 
        });
  
        const userPosts = allPost.map((post) => post.get({ plain: true }));
   
        res.render('userPosts', {
            layout:"dashboard",
            userPosts,
        });
    } catch (err) {
    console.log(err);
    res.redirect("login");
    } 
});

router.get("/new", withAuth, (req, res) => {
    res.render("newPost", {
      layout: "dashboard"
    });
});

// router.get("/edit/:id", withAuth, async (req, res) => {
//     try {

//        const postData  =  await Post.findByPk(req.params.id);
      
//        const post = postData.get({ plain: true });
//        res.render("editPost", {
//         layout: "dashboard",
//         post
//         });
//     } catch (err) {
//         console.log(err);
//         res.redirect("login");
//     } 
//   });
router.get('/myposts', withAuth, async (req, res) => {
    try {
        console.log('PRUEBAAAAAAAAAAAAAAAAAAAAAA');
        console.log(req.session.user_id);
        const posts = await Post.findAll({            
            where: {
                user_id: req.session.user_id
            },
            include: [User],
        });
        const allPosts = posts.map((recipe) => recipe.get({ plain:true }));
        console.log('AUI VIENE LOS POSTS DE ESTE USUARIO');
        console.log(allPosts);
        res.render('allPosts', {
            layout: 'dashboard',
            allPosts,
            logged_in: req.session.logged_in,
        });
        console.log('aqui res:');
        console.log(allPosts);
    } catch (err) {
        console.log(err);
        res.redirect('../login');
    }
});

module.exports = router;