let rightArrow = document.querySelector(".right-arrow")
let leftArrow = document.querySelector(".left-arrow")
let container = document.querySelector(".container")

rightArrow.addEventListener('click', () => {
    container.classList.add('move')
    rightArrow.classList.remove('appear')
    leftArrow.classList.add('appear')
})

leftArrow.addEventListener('click', () => {
    container.classList.remove('move')
    rightArrow.classList.add('appear')
    leftArrow.classList.remove('appear')
})