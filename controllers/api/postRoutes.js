const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');
const multerInfo = require('../../utils/uploadImg');



router.post('/new', withAuth, multerInfo, async (req, res) => {
    try {
        let name;
        req.file == undefined ? name = 'NULL' : name = req.file.filename;
        const newRecipe = await Post.create({
            title: req.body.name, 
            body: req.body.recipe, 
            file_img: name, 
            user_id: req.session.user_id
        });
        const recipeData = newRecipe.get({plain: true});
        console.log(recipeData);

        const posts = await Post.findAll({            
            where: {
                user_id: req.session.user_id
            },
            include: [User],
        });

        const allPosts = posts.map((recipe) => recipe.get({ plain:true }));
        res.render('allPosts', {
            layout: 'dashboard',
            allPosts,
            logged_in: req.session.logged_in,
            });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/new', withAuth, async (req, res) => {
    try {
      const newPost = await Post.create({
        title: req.body.title,
        body: req.body.body,
        user_id: req.session.user_id
        });
        
        res.json({ message: 'Your post has been published successfully!' });
      
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.put("/:id", withAuth, async (req, res) => {
    try {
      Post.update(req.body,{
        where: {
          id: req.params.id
        }
      });
  
      res.status(200).end();
       
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.delete("/:id", withAuth, async (req, res) => {
    try {
      Post.destroy({
        where: {
          id: req.params.id
        }
      });
  
      res.status(200).end();
       
    } catch (err) {
      res.status(400).json(err);
    }
  });
    
  


module.exports = router; 