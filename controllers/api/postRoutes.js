const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { Post, User } = require('../../models');
const { getAttributes } = require('../../models/User');
const withAuth = require('../../utils/auth');
const multerInfo = require('../../utils/uploadImg');

router.post('/new', withAuth, multerInfo, async (req, res) => {
    try {
        let img;
        req.file == undefined ? img = 'none' : img = req.file.filename;
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
      req.file == undefined ? img = req.body.file_img : img = req.file.filename;

      await Post.update({ 
        title: req.body.name, 
        body: req.body.recipe, 
        category: req.body.category,
        file_img: img
      }, 
      {
        where: {
            user_id: req.session.user_id
        },
        include: [User],
        order: [['created_at', 'DESC']],
      });


      
      if (req.file != undefined) {
        fs.unlinkSync(path.join(__dirname, `../../public/images/userUploads/${req.body.file_img}`));
      }      


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
      const fileName = await Post.findByPk(req.params.id, {attributes: ['file_img']});
      
      Post.destroy({
        where: {
          id: req.params.id
        }
      });
      
      fs.unlinkSync(path.join(__dirname, `../../public/images/userUploads/${fileName.file_img}`));
  
      res.status(200).end();
       
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }

});
    
module.exports = router; 


