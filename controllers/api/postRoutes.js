const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');
const multerInfo = require('../../utils/uploadImg');

router.post('/new', withAuth, multerInfo, async (req, res) => {
    try {
        let img;
        req.file == undefined ? img = 'NULL' : img = req.file.filename;
        const newRecipe = await Post.create({
            title: req.body.name, 
            body: req.body.recipe,
            category: req.body.category,
            file_img: img, 
            user_id: req.session.user_id
        });
       
        //const recipeData = newRecipe.get({plain: true});
        const posts = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [User],
        });

        const userPosts = posts.map((post) => post.get({ plain:true }));
        res.render('userPosts', {
            layout: 'dashboard',
            userPosts,
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
 f1171f83f7b6d18f13d5524b0cf738ed01758ca
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
    
 //Codigo Repetido... 
// router.put("/:id", withAuth, async (req, res) => {
//   try {
//     Post.update(req.body,{
//       where: {
//         id: req.params.id
//       }
//     });

//     res.status(200).end();
      
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });
  
// router.delete("/:id", withAuth, async (req, res) => {
//   try {
//     Post.destroy({
//       where: {
//         id: req.params.id
//       }
//     });

//     res.status(200).end();
      
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });
    
module.exports = router; 