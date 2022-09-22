const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

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