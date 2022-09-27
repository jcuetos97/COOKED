// //const likebtn = document.getElementById('heart-icon')
// let emptyheart= true;

// likebtn.addEventListener('click', () => {
//     if (emptyheart) {
//         likebtn.classList.toggle('fa-regular');
//         likebtn.classList.add('fa-solid');
//         emptyheart = false;
//     } else {
//         likebtn.classList.toggle('fa-solid')
//         likebtn.classList.add('fa-regular')
//         emptyheart = true;
//     }


const button = document.querySelector('.btnl')
button.addEventListener('click', () => {
    button.classList.toggle('liked');
})




