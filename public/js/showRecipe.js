const imgRecipe = document.querySelectorAll('.card-image')
const textRecipe = document.querySelectorAll('.recipe-body')


for (let i = 0; i < imgRecipe.length; i++) {
    imgRecipe[i].addEventListener('click', () => {
        textRecipe[i].style.width = imgRecipe[i].style.width;
        textRecipe[i].style.height = imgRecipe[i].style.height;
        imgRecipe[i].style.opacity = 0;
        textRecipe[i].style.display = 'block';
    })
    textRecipe[i].addEventListener('click', () => {
        imgRecipe[i].style.opacity = 100;
        textRecipe[i].style.display = 'none';
    })
  }

