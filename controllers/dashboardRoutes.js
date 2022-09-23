const router = require("express").Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');
const { route } = require("./homeRoutes");

router.get('/', withAuth, async (req,res) => {
    try {
        const allPost = await Post.findAll({
            where: { 
                user_id: req.session.user_id 
            }, 
            include: [User],
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