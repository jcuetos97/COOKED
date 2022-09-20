const updatePostHandler = async function(event) {
    event.preventDefault();

    const title = document.getElementById('post-title');
    const body = document.getElementById('post-body');
    const postId = document.getElementById('post-id');


    if (body && title) {
        const response = await fetch("/api/post/" + postId.value, {
            method: "PUT",
            body: JSON.stringify({
                title: title.value,
                body: body.value,
            }),
            headers: { "Content-Type": "application/json" }
        });
        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert('Failed to edit post.');
        }
    }
};

const form =  document.querySelector('#edit-post-form');
form.addEventListener("submit", updatePostHandler);