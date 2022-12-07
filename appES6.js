// Book class start
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
    formCheck() {
        const ui = new UI();
        if (this.title !== "" && this.author !== "" && this.isbn !== "") {
            if (!isNaN(parseInt(this.isbn))) {
                if (this.isbn.length === 4) {
                    const books = Storage.getBooks();
                    let flag = false;
                    for (let i = 0; i < books.length; i++) {
                        if (parseInt(books[i].isbn) === parseInt(this.isbn)) {
                            ui.sendMessage("This ISBN number already exists in the database", 0);
                            return false;
                        }
                    }
                    ui.sendMessage("Added Succesfully!", 1);
                    return true;
                } else ui.sendMessage("The ISBN number needs to be 4 characters long!", 0);
            } else ui.sendMessage("The ISBN number cannot contain any letters!", 0);
        } else ui.sendMessage("Please fill out the form first!", 0);
    }
}
// Book class end

// UI class start
class UI {
    addBookToList(book) {
        // Creating items
        const div = document.createElement("div");
        div.className = "main-results-item";
        div.innerHTML = `<div class="title-items">${book.title}</div>
                         <div class="title-items">${book.author}</div>
                         <div class="title-items">${book.isbn}</div>
                         <div class="title-items"><i class="fa-solid fa-xmark fa-lg" id="delete-icon"></i></div>`;

        // Getting results div
        document.querySelector(".result-container").appendChild(div);
    }
    sendMessage(text, color) {
        clearTimeout(myTimeoutID);
        const messageBox = document.querySelector(".messageBox");
        const messageSpan = document.querySelector("#message");

        color === 0 ? messageBox.style.backgroundColor = "rgb(255, 0, 0, 0.3)" : messageBox.style.backgroundColor = "rgb(0, 255, 0, 0.1)";
        messageSpan.textContent = text;
        messageBox.style.display = "flex";
        myTimeoutID = setTimeout(() => messageBox.style.display = "none", 3000);
    }
    clearAllItems() {
        const itemList = document.querySelector(".result-container").children;
        for (let i = 1; i < itemList.length; i++) {
            itemList[i].remove();
            i--;
        }
    }
    clearItem(target) {
        if (target.id === "delete-icon") {
            target.parentElement.parentElement.remove();
        }
    }
    clearFields() {
        const inputs = Array.from(document.querySelectorAll(".input-field"));
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = "";
        }
    }
}
// UI class end

// LocalStorage start
class Storage {
    static getBooks() {
        let books;
        if (localStorage.getItem("books") === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }
    static displayBooks() {
        const books = Storage.getBooks();
        for (let i = 0; i < books.length; i++) {
            const book = new Book(books[i].title, books[i].author, books[i].isbn);
            ui.addBookToList(book);
        }
    }
    static addBookToStorage(book) {
        const books = Storage.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }
    static removeBook(isbn) {
        const books = Storage.getBooks();
        for (let i = 0; i < books.length; i++) {
            if (parseInt(books[i].isbn) === parseInt(isbn)) {
                books.splice(i, 1);
            }
        }
        localStorage.setItem("books", JSON.stringify(books));
    }
    static removAllBooks() {
        const emptyArray = [];
        localStorage.setItem("books", JSON.stringify(emptyArray));
    }
}
// LocalStorage end

// Main start
const form = document.querySelector("form");
const clearAllBtn = document.querySelector("#clear-all-btn");
const resultContainer = document.querySelector(".result-container")
const ui = new UI();

form.addEventListener("submit", addItem);
clearAllBtn.addEventListener("click", () => {
    ui.clearAllItems();
    Storage.removAllBooks();
});
resultContainer.addEventListener("click", (e) => {
    console.log("removeBlockClicked");
    ui.clearItem(e.target)
    const target = e.target.parentElement.parentElement;
    const isbn = target.children[2].textContent;
    console.log(isbn)
    Storage.removeBook(isbn);
});

Storage.displayBooks();
var myTimeoutID;

function addItem(e) {
    e.preventDefault();
    // Getting UI elements
    const title = document.querySelector(".book-input");
    const author = document.querySelector(".author-input");
    const isbn = document.querySelector(".isbn-input");
    // Instantiate new book
    const book = new Book(title.value, author.value, isbn.value);
    if (book.formCheck()) {
        ui.addBookToList(book);
        Storage.addBookToStorage(book);
    }
}
// Main end
