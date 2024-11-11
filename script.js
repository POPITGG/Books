document.addEventListener("DOMContentLoaded", loadBooks);

function addBook() {
    const imgUrl = document.getElementById("imgUrl").value;
    const bookTitle = document.getElementById("bookTitle").value;
    const bookNotes = document.getElementById("bookNotes").value;

    const bookList = document.getElementById("bookList");

    // Create book item container
    const bookItem = document.createElement("div");
    bookItem.classList.add("book-item");

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerText = "X";
    deleteBtn.onclick = function() {
        bookList.removeChild(bookItem);
        removeBookFromLocal(bookTitle);  // Remove from local storage
    };
    bookItem.appendChild(deleteBtn);

    // Add book image
    const bookImg = document.createElement("img");
    bookImg.src = imgUrl;
    bookItem.appendChild(bookImg);

    // Add book title
    const title = document.createElement("h3");
    title.innerText = bookTitle;
    bookItem.appendChild(title);

    // Add book notes
    const notes = document.createElement("p");
    notes.innerText = bookNotes;
    bookItem.appendChild(notes);

    // Append to book list
    bookList.appendChild(bookItem);

    // Save to local storage
    saveBookToLocal({ imgUrl, bookTitle, bookNotes });

    // Clear input fields
    document.getElementById("imgUrl").value = '';
    document.getElementById("bookTitle").value = '';
    document.getElementById("bookNotes").value = '';
}

function saveBookToLocal(book) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
}

function loadBooks() {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const bookList = document.getElementById("bookList");

    books.forEach((book) => {
        const bookItem = document.createElement("div");
        bookItem.classList.add("book-item");

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerText = "X";
        deleteBtn.onclick = function() {
            bookList.removeChild(bookItem);
            removeBookFromLocal(book.bookTitle);
        };
        bookItem.appendChild(deleteBtn);

        const bookImg = document.createElement("img");
        bookImg.src = book.imgUrl;
        bookItem.appendChild(bookImg);

        const title = document.createElement("h3");
        title.innerText = book.bookTitle;
        bookItem.appendChild(title);

        const notes = document.createElement("p");
        notes.innerText = book.bookNotes;
        bookItem.appendChild(notes);

        bookList.appendChild(bookItem);
    });
}

function removeBookFromLocal(bookTitle) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books = books.filter(book => book.bookTitle !== bookTitle);
    localStorage.setItem("books", JSON.stringify(books));
}
