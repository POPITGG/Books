document.addEventListener("DOMContentLoaded", () => {
    // Add numbering to existing books on page load
    updateBookNumbers();

    const addBookButton = document.querySelector("button");
    addBookButton.addEventListener("click", addBook);
});

function addBook() {
    const imgUrl = document.getElementById("imgUrl").value;
    const bookTitle = document.getElementById("bookTitle").value;
    const bookNotes = document.getElementById("bookNotes").value;

    if (!imgUrl || !bookTitle || !bookNotes) {
        alert("Lūdzu, aizpildiet visus laukus!");
        return;
    }

    const bookList = document.getElementById("bookList");

    // Create book item container
    const bookItem = createBookItem(imgUrl, bookTitle, bookNotes);

    // Append to book list
    bookList.appendChild(bookItem);

    // Update numbers for all books
    updateBookNumbers();

    // Clear input fields
    document.getElementById("imgUrl").value = '';
    document.getElementById("bookTitle").value = '';
    document.getElementById("bookNotes").value = '';
}

function createBookItem(imgUrl, bookTitle, bookNotes) {
    const bookItem = document.createElement("div");
    bookItem.classList.add("book-item");

    // Create and append the delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerText = "X";
    deleteBtn.onclick = () => {
        bookItem.remove();
        updateBookNumbers(); // Recalculate numbers after deletion
    };
    bookItem.appendChild(deleteBtn);

    // Add book image
    const bookImg = document.createElement("img");
    bookImg.src = imgUrl;
    bookItem.appendChild(bookImg);

    // Add book title
    const title = document.createElement("h3");
    title.innerText = bookTitle; // Initial title (number will be added later)
    bookItem.appendChild(title);

    // Add book notes
    const notes = document.createElement("p");
    notes.innerText = bookNotes;
    bookItem.appendChild(notes);

    return bookItem;
}

// Function to update book numbers dynamically
function updateBookNumbers() {
    const bookItems = document.querySelectorAll(".book-item");
    bookItems.forEach((item, index) => {
        const titleElement = item.querySelector("h3");
        const originalTitle = titleElement.innerText.replace(/\(\d+\)$/, ""); // Remove existing number if any
        titleElement.innerText = `${originalTitle} (${index + 1})`; // Add new number
    });
}
