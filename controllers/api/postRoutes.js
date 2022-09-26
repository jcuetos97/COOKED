const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');
const multerInfo = require('../../utils/uploadImg');

router.post('/new', withAuth, multerInfo, async (req, res) => {
    try {
        let img;
        req.file == undefined ? img = 'NULL' : img = req.file.filename;
        await Post.create({
            title: req.body.name, 
            body: req.body.recipe,
            category: req.body.category,
            file_img: img, 
            user_id: req.session.user_id
        });
       
        const posts = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [User],
            order: [['created_at', 'DESC']],
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


router.post("/:id", withAuth, multerInfo, async (req, res) => {
    try {      
      let img;
      req.file == undefined ? img = req.body.file_img : img = req.file.filename; //else: bandera borrar ON
      await Post.update({ 
        title: req.body.name, 
        body: req.body.recipe, 
        category: req.body.category,
        file_img: img
      }, 
      {
        where: {
          id: req.params.id
        }
      });

     //borra el archivo que esta en la carpeta userUploads, que se llama req.body.file_img;

      const posts = await Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        include: [User],
        order: [['created_at', 'DESC']],
      });
      const userPosts = posts.map((post) => post.get({ plain:true }));
      res.render('userPosts', {        
        layout: 'dashboard',
        userPosts,
        logged_in: req.session.logged_in,
      });
       
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


