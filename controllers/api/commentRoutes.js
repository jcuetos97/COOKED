const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = Comment.create(
      { 
        ...req.body, 
        user_id: req.session.user_id 
      })

    res.json({ user: newComment, message: 'Your comment has been published successfully.'});

  } catch(err)  {
    res.status(500).json(err);
  }
});

module.exports = router;



module.exports = router;