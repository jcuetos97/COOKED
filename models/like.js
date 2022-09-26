const handleLike = (id) => {
    setPost([...Post], [Post.find((Post => id == Post.id)).likes += 1])
}
if (likes === false) {
    setPost([...Post], [Post.likes -= 1])
}
// setPost([...Post], [Post.liked_by_user = !liked])
this.setState({ Post.likes: handleLike });