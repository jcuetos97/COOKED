

const likebtn = document.getElementById('heart-icon')
let emptyheart = true;

likebtn.addEventListener('click', () => {
    if (emptyheart) {
        likebtn.classList.toggle('fa-regular');
        likebtn.classList.add('fa-solid');
        emptyheart = false;
    } else {
        likebtn.classList.toggle('fa-solid')
        likebtn.classList.add('fa-regular')
        emptyheart = true;
    }
})



likebtn[i].addEventListener('click', async () => {
    if (likebtn[i].classList.contains('fa-regular')) {
        likebtn[i].classList.toggle('fa-regular');
        likebtn[i].classList.add('fa-solid');
        console.log(likebtn[i].id);
        await fetch("/api/post/like/" + likebtn[i].id, {
            method: "POST",
            body: JSON.stringify({
                post_id: likebtn[i].id,
            }),
            headers: { "Content-Type": "application/json" }
        });
    } else if (likebtn[i].classList.contains('fa-solid')) {
        likebtn[i].classList.toggle('fa-solid')
        likebtn[i].classList.add('fa-regular')
        await fetch("/api/post/like/" + likebtn[i].id, {
            method: "DELETE"
        });
    }
})





















>>>>>>> origin


