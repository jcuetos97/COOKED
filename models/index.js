const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Rating = require('./Rating');

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
  
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});
  
Rating.belongsTo(Post, {
    as: 'RatingMain',
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});


Rating.belongsTo(Post, {
    as: 'RatingHelper',
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Rating.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});


User.hasMany(Rating, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.hasMany(Rating, {
    as: 'RatingMain',
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Post.hasMany(Rating, {
    as: 'RatingHelper',
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

module.exports = { 
    User, 
    Comment,
    Post, 
    Rating,
};
