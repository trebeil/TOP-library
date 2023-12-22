function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${ this.read === 'yes' ? 'read' : 'not read yet' }`;
  };
}

function createBook(title, author, pages, read) {
  book = new Book(title, author, pages, read);
  return book;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function clearBooksTable(table) {
  table.replaceChildren();
}

function populateBooksTable(library, table) {
  createTableHeaders(table);
  library.forEach((book) => {
    appendNewBook(book, table);
  })
}

function createTableHeaders(table) {
  row = document.createElement('tr');
  appendTableHeader(row, 'Title');
  appendTableHeader(row, 'Author');
  appendTableHeader(row, 'Pages');
  appendTableHeader(row, 'Read');
  //appendTableHeader(row, '');
  //appendTableHeader(row, '');
  table.appendChild(row);
}

function appendTableHeader(row, text) {
  header = document.createElement('th');
  header.textContent = text;
  row.appendChild(header);
}

function appendNewBook(book, table) {
  row = getNewRowElement(book);
  table.appendChild(row);
}

function getNewRowElement(book) {
  row = document.createElement('tr');

  appendDataToRow(book, row, 'title');
  appendDataToRow(book, row, 'author');
  appendDataToRow(book, row, 'pages');
  appendDataToRow(book, row, 'read');
  appendReadButtonToRow(book, row);
  appendDeleteButtonToRow(book, row);

  return row;
}

function appendDataToRow(book, row, property) {
  data = document.createElement('td');
  data.textContent = book[property];
  row.appendChild(data);
}

function appendReadButtonToRow(book, row) {
  button = document.createElement('button');
  button.classList.add('read-button');
  button.textContent = book.read === 'no' ? 'Mark read' : 'Mark unread';
  button.setAttribute('type', 'button');
  row.appendChild(button);
  button.book = book;
  button.addEventListener('click', updateBookRead);
}

function updateBookRead(event) {
  book = event.currentTarget.book;
  toggleBookRead(book);
  updateBooksTable();
}

function toggleBookRead(book) {
  if (book.read === 'no') {
    book.read = 'yes';
  } else {
    book.read = 'no';
  }
}

function appendDeleteButtonToRow(book, row) {
  button = document.createElement('button');
  button.textContent = 'X';
  button.setAttribute('type', 'button');
  row.appendChild(button);
  button.book = book;
  button.addEventListener('click', deleteBook);
}

function deleteBook(event) {
  book = event.currentTarget.book;
  removeBookFromLibrary(myLibrary, book);
  updateBooksTable();
}

function removeBookFromLibrary(library, book) {
  library.splice(library.indexOf(book), 1);
}

function createSampleBooks() {
  book1 = createBook('The Hobbit', 'J.R.R. Tolkien', 295, 'no');
  book2 = createBook('Lord of The Rings', 'J.R.R. Tolkien', 500, 'no');
  addBookToLibrary(book1);
  addBookToLibrary(book2);
  updateBooksTable();
}

function setModalButtons() {
  const dialog = document.querySelector("dialog");
  const showButton = document.querySelector(".new-book");
  const closeButton = document.querySelector(".close-dialog");
  
  showButton.addEventListener("click", () => {
    dialog.showModal();
  });
  
  closeButton.addEventListener("click", () => {
    dialog.close();
  });
}

function setAddBookButton() {
  const addBookButton = document.querySelector("form button");
  addBookButton.addEventListener("click", addBook);
}

function addBook() {
  title = document.querySelector("#title").value;
  author = document.querySelector("#author").value;
  pages = document.querySelector("#pages").value;
  read = document.querySelector('input[name="read"]:checked').value;
  book = createBook(title, author, pages, read);
  addBookToLibrary(book);
  updateBooksTable();
  closeDialog();
  resetForm();
}

function updateBooksTable(){
  table = document.querySelector('table');
  clearBooksTable(table);
  populateBooksTable(myLibrary, table);
}

function closeDialog() {
  const dialog = document.querySelector("dialog");
  dialog.close();
}

function resetForm() {
  form = document.querySelector('form');
  form.reset();
}

const myLibrary = [];
setModalButtons();
setAddBookButton();
createSampleBooks();