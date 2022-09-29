const deletePostHandler = async function(event) {
    event.preventDefault();
    
    const response = await fetch("/api/post/" + event.target.id, {
        method: "DELETE"
    });
    if (response.ok) {
        document.location.replace("/dashboard/myposts");
    } else {
        alert('Failed to delete post.');
    }
}

const btnDelete = document.querySelectorAll("#delete-btn");
for (let i= 0; i < btnDelete.length; i++ ) {    
    btnDelete[i].addEventListener("click", deletePostHandler);
}