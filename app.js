const form = document.querySelector("form");

form.addEventListener("submit", addListItem);

function formCheck(e) {
    // Getting UI elements
    const title = document.querySelector(".book-input");
    const author = document.querySelector(".author-input");
    const isbn = document.querySelector(".isbn-input");
    if(title.value !== "" && author.value !== "" && isbn.value !== "") {
        if(!isNaN(parseInt(isbn.value))) {
            if(isbn.value.length === 13) {
                return true;
            } else sendMessage("The ISBN number needs to be 13 characters long!", 0);
        } else sendMessage("The ISBN number cannot contain any letters!", 0);
    } else sendMessage("Please fill out the form first!", 0);

}

function addListItem(e) {
    e.preventDefault();
    if(formCheck()) {
        // Getting UI elements
        const title = document.querySelector(".book-input");
        const author = document.querySelector(".author-input");
        const isbn = document.querySelector(".isbn-input");

        // Creating items
        const div = document.createElement("div");
        div.className = "main-results-item";
        
        div.innerHTML = `<div class="title-items">${title.value}</div>
                         <div class="title-items">${author.value}</div>
                         <div class="title-items">${isbn.value}</div>
                         <div class="title-items"><i class="fa-solid fa-xmark fa-lg" id="delete-icon"></i></div>`;
        
        // Getting results div
        resultsContainer = document.querySelector(".result-container").appendChild(div);
    }
}

let myTimeoutID;

function sendMessage(text, color) {
    const messageBox = document.querySelector(".messageBox");
    const message = document.querySelector("#message");

    color === 0 ? messageBox.style.backgroundColor  = "rgb(255, 0, 0, 0.3)" : messageBox.style.backgroundColor  = "rgb(0, 255, 0, 0.1)";
    message.textContent = text;
    messageBox.style.display = "flex";
    clearTimeout(myTimeoutID);
    myTimeoutID = setTimeout(() => messageBox.style.display = "none", 3000);
    
}