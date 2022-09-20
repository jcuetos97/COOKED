const deletePostHandler = async function(event) {
    event.preventDefault();

    const postId = document.getElementById('post-id');

    const response = await fetch("/api/post/" + postId.value, {
        method: "DELETE"
    });
    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert('Failed to delete post.');
    }
}

document
    .querySelector("#delete-btn")
    .addEventListener("click", deletePostHandler);