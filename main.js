let rightArrow = document.querySelector(".right-arrow")
let leftArrow = document.querySelector(".left-arrow")
let container = document.querySelector(".container")
let books = document.querySelectorAll('.book')
let selectedBook = ''
let bookOrder = Array.from(books).map(b => {return b.dataset.order})

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

for (const book of books) {
    book.addEventListener('click', () => {
        if (selectedBook == '') {
            selectedBook = book
            book.classList.add('selected')
        } else if (selectedBook == book) {
            selectedBook = ''
            book.classList.remove('selected')
        } else bookSwap(selectedBook, book)
    })
}

function bookSwap(book1, book2) {
    let order1 = book1.style.order
    let order2 = book2.style.order
    let dataOrder1 = book1.dataset.order
    let dataOrder2 = book2.dataset.order
    
    book2.style.order = order1
    book1.style.order = order2
    book1.classList.remove('selected')
    book2.classList.remove('selected')
    selectedBook = ''

    console.log(bookOrder); 
    bookOrder[bookOrder.indexOf(dataOrder1)] = dataOrder2
    bookOrder[bookOrder.indexOf(dataOrder2)] = dataOrder1
    console.log(bookOrder); 
}
