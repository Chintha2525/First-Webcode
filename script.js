const Url = 'https://anapioficeandfire.com/api/books?pageSize=50';

async function fetchBooks() {
  try {
    const response = await fetch(Url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error:', error);
  }
}

function displayBooks(books) {
  const booksDiv = document.getElementById('books');
  booksDiv.innerHTML = '';

  books.forEach(book => {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');

    const name = document.createElement('h2');
    name.textContent = book.name;

    const isbn = document.createElement('p');
    isbn.textContent = `ISBN: ${book.isbn}`;

    const pages = document.createElement('p');
    pages.textContent = `Pages: ${book.numberOfPages}`;

    const authors = document.createElement('p');
    authors.textContent = `Authors: ${book.authors.join(', ')}`;

    const publisher = document.createElement('p');
    publisher.textContent = `Publisher: ${book.publisher}`;

    const released = document.createElement('p');
    released.textContent = `Released: ${book.released}`;

    const characters = document.createElement('p');
    characters.textContent = `Characters: ${book.characters.slice(0, 5).join(', ')}...`;

    bookDiv.appendChild(name);
    bookDiv.appendChild(isbn);
    bookDiv.appendChild(pages);
    bookDiv.appendChild(authors);
    bookDiv.appendChild(publisher);
    bookDiv.appendChild(released);
    bookDiv.appendChild(characters);

    booksDiv.appendChild(bookDiv);
  });
}

async function main() {
  const books = await fetchBooks();
  displayBooks(books);

  const searchInput = document.getElementById('search');
  searchInput.addEventListener('input', () => {
    const filteredBooks = books.filter(book => book.name.toLowerCase().includes(searchInput.value.toLowerCase()));
    displayBooks(filteredBooks);
  });
}

main();
