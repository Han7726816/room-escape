let rightArrow = document.querySelector(".right-arrow")
let leftArrow = document.querySelector(".left-arrow")
let container = document.querySelector(".container")
let darken = document.querySelector(".darken")
let inventory = document.querySelector(".inventory")
let paperBall = document.querySelector(".paper-ball")
let key = document.querySelector(".key")
let shelf = document.querySelector('.shelf-image')
let books = document.querySelectorAll('.book')
let popups = Array.from(document.querySelectorAll('.popup'))
let clickables = document.querySelectorAll('.clickable')
let keys = Array.from(document.querySelectorAll('.keys'))
let selectedBook = ''
let selectedItem = ''
let piano = [];
let bookOrder = Array.from(books)
let correctBookOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


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

darken.addEventListener('click', () => {
    for (const popup of popups) {
        popup.classList.remove('appear')
    }
    darken.classList.remove('appear')
})

paperBall.addEventListener('click', () => {
    let div = document.createElement('div')
    let img = document.createElement('img')
    img.src = paperBall.src
    div.classList.add('item')
    div.dataset.name = 'paper-ball'
    div.appendChild(img)
    inventory.appendChild(div)
    paperBall.remove()

    div.addEventListener('click', selectItem)
})

key.addEventListener('click', () => {
    let div = document.createElement('div')
    let img = document.createElement('img')
    img.src = key.src
    div.classList.add('item')
    div.dataset.name = 'drawer-key'
    div.appendChild(img)
    inventory.appendChild(div)
    key.remove()

    div.addEventListener('click', selectItem)
})

shelf.addEventListener('click', () => {
    if (selectedItem == 'drawer-key') {
        shelf.src = "./images/open-shelf.png"
    }
})

for (const book of books) {
    book.addEventListener('click', selectBook)
}

for (const clickable of clickables) {
    clickable.addEventListener('click', () => {
        let correspondingPopup = popups.filter(p => {return p.classList.contains(clickable.id)})[0]

        correspondingPopup.classList.add('appear')
        darken.classList.add('appear')
    })
}

for (const key of keys) {
    key.addEventListener('click', pianokeys)
}

function bookSwap(book1, book2) {
    let order1 = book1.style.order
    let order2 = book2.style.order
    let numberOrder
    let isCorrect = true
    
    book2.style.order = order1
    book1.style.order = order2
    book1.classList.remove('selected')
    book2.classList.remove('selected')
    
    bookOrder.sort((a, b) => {return a.style.order.toString() - b.style.order.toString()})

    numberOrder = bookOrder.map(b => {return b.dataset.order.toString()})
    selectedBook = ''

    for (let i = 0; i < numberOrder.length; i++) {
        const num1 = numberOrder[i];
        const num2 = correctBookOrder[i];

        if (num1 != num2) {
            isCorrect = false
            break
        }
    }

    if (isCorrect) {
        for (const book of bookOrder) {
            book.removeEventListener('click', selectBook)
        }
    }
}

function selectBook(e) {
    let book = e.target
    if (selectedBook == '') {
        selectedBook = book
        book.classList.add('selected')
    } else if (selectedBook == book) {
        selectedBook = ''
        book.classList.remove('selected')
    } else bookSwap(selectedBook, book)
}

function selectItem(e) {
    let item = e.target
    if (selectedItem == item.dataset.name) {
        selectedItem = ''
    } else {
        selectedItem = item.dataset.name
        item.classList.add('selected')
    }
    
    let items = Array.from(document.querySelectorAll('.item'))
    
    for (const item of items) {
        if (selectedItem != item.dataset.name) item.classList.remove('selected')
    }
}

function pianokeys(e){
    let x = e.target.id
    piano.push(x);
    x = "./pianosound/".concat(x)
    document.getElementById("paudio").src= x.concat(".mp3");
    document.getElementById("paudio").play();
    if(piano.join().includes("G,AS,C1,GS,G,F,DS,F,C1,AS,C1,G,DS,F,DS")){
       // do your shit here after correct rhythm
    }
}
