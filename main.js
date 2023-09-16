let rightArrow = document.querySelector(".right-arrow")
let leftArrow = document.querySelector(".left-arrow")
let container = document.querySelector(".container")
let room3 = document.querySelector(".room3")
let darken = document.querySelector(".darken")
let inventory = document.querySelector(".inventory")
let upper = document.querySelector(".upper")
let bookDiv = document.querySelector(".bookdiv")
let paperBall = document.querySelector(".paper-ball")
let drawerPiece = document.querySelector(".drawer-piece")
let frameNote = document.querySelector(".frame-note")
let bookNote = document.querySelector(".book-note")
let key = document.querySelector(".key")
let upperDoor = document.querySelector(".upper-door")
let missing = document.querySelector(".missing")
let piano1 = document.querySelector("#piano1")
let shelf = document.querySelector('.shelf-image')
let books = document.querySelectorAll('.book')
let clickables = document.querySelectorAll('.clickable')
let popups = Array.from(document.querySelectorAll('.popup'))
let pieces = Array.from(document.querySelectorAll('.piece'))
let keys = Array.from(document.querySelectorAll('.keys'))
let selectedBook = ''
let selectedItem = ''
let piano = [];
let bookOrder = Array.from(books)
let correctBookOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let upperId
let upperDoorOpened = false


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

piano1.addEventListener('click', () => {openPopup("piano1")})

paperBall.addEventListener('click', () => {
    let item = addToInventory(paperBall, 'paper-ball', false)

    item.addEventListener('click', () => {openPopup("note1")})
})

drawerPiece.addEventListener('click', () => {addToInventory(drawerPiece, "drawer-piece", true)})

key.addEventListener('click', () => {addToInventory(key, 'drawer-key', true)})

frameNote.addEventListener('click', () => {
    let item = addToInventory(frameNote, 'frame-note', false)

    item.addEventListener('click', () => {openPopup("note2")})
})

bookNote.addEventListener('click', () => {
    let item = addToInventory(bookNote, 'book-note', false)
    
    item.addEventListener('click', () => {openPopup("piano3")})
})

shelf.addEventListener('click', () => {
    if (selectedItem == 'drawer-key') {
        shelf.src = "./images/open-shelf.png"
        drawerPiece.classList.add('appear')
        shelf.style.pointerEvents = "none"
    } else displayUpper("Locked")
})

missing.addEventListener('click', () => {
    if (selectedItem == 'drawer-piece') {
        missing.src = "./images/piece5.png"
        missing.classList.remove('missing')
        
        for (const piece of pieces) {
            piece.addEventListener('click', rotatePiece)
            piece.classList.add('clickable')
        }
    }
})

for (const book of books) {
    book.addEventListener('click', selectBook)
}

for (const clickable of clickables) {
    clickable.addEventListener('click', () => {openPopup(clickable.id)})
}

for (const key of keys) {
    key.addEventListener('click', pianokeys)
}

for (const piece of pieces) {
    piece.style.transform = 'rotate(' + piece.dataset.rotation + "deg)"
    
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
        bookDiv.classList.add('clear')
        bookNote.classList.add('appear')
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
    x = "./audio/" + x + ".mp3"
    let audio = document.createElement('audio')
    audio.src= x;
    audio.play();
    if(piano.join().includes("D,C,D,G,A,AS,A,AS,A,F,C,C,D,C,D,G,F,D,AS")){
       openDoor()
    } else if (piano.join().includes("A,A,A")) {
        openDoor()
    }
}

function rotatePiece(e) {
    let piece = e.target
    let rotation = parseInt(piece.dataset.rotation) + 90
    if (rotation >= 360) rotation = 0

    piece.style.transform = 'rotate(' + rotation + "deg)"
    piece.dataset.rotation = rotation

    let incorrectPieces = pieces.filter(p => {return parseInt(p.dataset.rotation) != 0 && !p.classList.contains('ignore')})

    if (incorrectPieces.length == 0) {
        frameNote.classList.add('appear')
    }
}

function addToInventory(element, name, selectable) {
    let div = document.createElement('div')
    let img = document.createElement('img')
    img.src = element.src
    div.classList.add('item')
    div.dataset.name = name
    div.appendChild(img)
    inventory.appendChild(div)
    element.remove()

    if (selectable) div.addEventListener('click', selectItem)

    return div
}

function displayUpper(text) {
    upper.classList.add('appear')
    upper.innerText = text
    clearTimeout(upperId)
    upperId = setTimeout(() => {
        upper.classList.remove('appear')
    }, 3000)
}

function openPopup(id) {
    for (const popup of popups) {
        popup.classList.remove('appear')
    }
    let correspondingPopup = popups.filter(p => {return p.classList.contains(id)})[0]

    correspondingPopup.classList.add('appear')
    darken.classList.add('appear')

}

function openDoor() {
    if (!upperDoorOpened) {
        upperDoor.addEventListener('click', () => {
            room3.classList.add('up')
            container.classList.add('up')
        })
        upperDoor.classList.add('hover')
        let audio = document.createElement('audio')
        audio.src = "./audio/door open.mp3"
        audio.play()
        displayUpper("Something has opened...")
        upperDoorOpened = true
    }
}
