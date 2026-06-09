// an array to contain the books
const myLibrary = [];

// a constructor to create a book object, which should have a unique id by calling crypto.randomUUID()
class Book {
  constructor(title, author, pages, isRead) {
    if (!new.target) {
      throw new Error("Book constructor must be called with new keyword");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = crypto.randomUUID();
  }

  //add toggleRead method directly in constructor
  toggleRead() {
    this.isRead = !this.isRead;
  }
}

//a function to create new book with specific arguments and push it into the library array
function addBookToLibrary(title, author, pages, isRead) {
  try {
    const newBook = new Book(title, author, pages, isRead);

    myLibrary.push(newBook);
    return newBook;
  } catch (error) {
    alert("Failed to add book: " + error.message);
  }
}

// a function to create bookCard
function createBookCard(book) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");

  //give each book a data-attribute that corresponds to the unique id of the respective book object
  bookCard.dataset.id = book.id;

  const bookInfo = document.createElement("div");
  bookInfo.classList.add("book-info");

  const title = document.createElement("h2");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const read = document.createElement("p");

  title.textContent = `Title: ${book.title}`;
  author.textContent = `Author: ${book.author}`;
  pages.textContent = `Pages: ${book.pages}`;
  read.textContent = book.isRead ? "Already read" : "Not yet read";

  bookInfo.appendChild(title);
  bookInfo.appendChild(author);
  bookInfo.appendChild(pages);
  bookInfo.appendChild(read);
  bookCard.appendChild(bookInfo);

  //function to create a button for deleting a book from library
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", (event) => {
    // this is my original code not understanding the instructions, which is not proper way if we were to utilize data from database
    // const index = myLibrary.findIndex(
    //   (libraryBook) => libraryBook.id === book.id,
    // );
    // if (index !== -1) {
    //   myLibrary.splice(index, 1);
    // }
    // bookCard.remove();
    const targetId = bookCard.getAttribute("data-id");
    const index = myLibrary.findIndex(
      (libraryBook) => libraryBook.id === targetId,
    );
    if (index !== -1) {
      myLibrary.splice(index, 1);
    }
    bookCard.remove();
  });
  bookCard.appendChild(deleteButton);

  //function to create a button to toggle the read status of book
  const toggleReadButton = document.createElement("button");
  toggleReadButton.textContent = "Read/Unread";
  toggleReadButton.classList.add("toggle-read-button");
  toggleReadButton.addEventListener("click", (event) => {
    // this is my original code not understanding the instructions, which is not proper way if we were to utilize data from database
    // const index = myLibrary.findIndex(
    //   (libraryBook) => libraryBook.id === book.id,
    // );
    // if (index !== -1) {
    //   myLibrary[index].isRead = !myLibrary[index].isRead;
    //   read.textContent = myLibrary[index].isRead
    //     ? "Already read"
    //     : "Not yet read";
    // }
    const targetId = bookCard.getAttribute("data-id");
    const targetBook = myLibrary.find(
      (libraryBook) => libraryBook.id === targetId,
    );
    if (targetBook) {
      targetBook.toggleRead();

      read.textContent = targetBook.isRead ? "Already read" : "Not yet read";
    }
  });
  bookCard.appendChild(toggleReadButton);

  return bookCard;
}

//a function that loops through myLibrary and display each book object as a card
function displayBooks() {
  const container = document.querySelector(".book-container");

  container.innerHTML = ""; //clear container

  myLibrary.forEach((book) => {
    const bookCard = createBookCard(book);
    container.appendChild(bookCard);
  });
}

//function for "Add Book" dialog button that creates a new book object and adds it to myLibrary
function addBook() {
  const submitButton = document.getElementById("submit-button");
  const bookForm = document.getElementById("book-form");

  submitButton.addEventListener("click", (event) => {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const isRead = document.getElementById("isRead").checked;
    event.preventDefault();
    const newBook = addBookToLibrary(title, author, pages, isRead);
    if (newBook) {
      const container = document.querySelector(".book-container");
      const newCard = createBookCard(newBook);
      container.appendChild(newCard);
    }
    bookForm.reset();
    closeFormDialog();
  });
}

//add function for closing dialog externally, so it can be reused and allows future modification
function closeFormDialog() {
  const dialog = document.getElementById("form-dialog");

  if (dialog) {
    dialog.close();
  }
}

//initiate addBook
addBook();
//add sample book
addBookToLibrary("Sample Book", "John Doe", 200, true);
//display books
displayBooks();
