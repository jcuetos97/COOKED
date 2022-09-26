const imgRecipe = document.querySelectorAll('.card-image')
const textRecipe = document.querySelectorAll('.recipe-body')


for (let i = 0; i < imgRecipe.length; i++) {
    imgRecipe[i].addEventListener('click', () => {
        imgRecipe[i].style.display = 'none';
        textRecipe[i].style.display = 'inherit';
    })
    textRecipe[i].addEventListener('click', () => {
        imgRecipe[i].style.display = 'inherit';
        textRecipe[i].style.display = 'none';
    })
  }

