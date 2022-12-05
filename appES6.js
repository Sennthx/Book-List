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
                if (this.isbn.length === 13) {
                    return true;
                } else ui.sendMessage("The ISBN number needs to be 13 characters long!", 0);
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
class LocalStorage{

}
// LocalStorage end

// Main start
const form = document.querySelector("form");
const clearAllBtn = document.querySelector("#clear-all-btn");
const resultContainer = document.querySelector(".result-container")
const ui = new UI();



form.addEventListener("submit", addItem);
clearAllBtn.addEventListener("click", ui.clearAllItems);
resultContainer.addEventListener("click", (e) => ui.clearItem(e.target));
var myTimeoutID;

function addItem(e) {
    e.preventDefault();
    // Getting UI elements
    const title = document.querySelector(".book-input");
    const author = document.querySelector(".author-input");
    const isbn = document.querySelector(".isbn-input");

    const book = new Book(title.value, author.value, isbn.value);
    if (book.formCheck()) {
        ui.addBookToList(book);
        ui.clearFields();
    }
}
// Main end
