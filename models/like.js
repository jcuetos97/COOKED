const handleLike = (id) => {
    setPost([...Post], [Post.find((Post => id == Post.id)).likes += 1])
}