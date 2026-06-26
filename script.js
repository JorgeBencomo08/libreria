const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayBooks();
}

function displayBooks() {
    const librosDiv = document.getElementById('libros');
    librosDiv.innerHTML = '';

    myLibrary.forEach(book => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.id = book.id;

        card.innerHTML = `
            <h2>${book.title}</h2>
            <p><span>Autor:</span> ${book.author}</p>
            <p><span>Páginas:</span> ${book.pages}</p>
            <button class="toggle-read ${book.read ? 'leido' : 'no-leido'}">
                ${book.read ? 'Leído' : 'No leído'}
            </button>
            <button class="remove">Eliminar</button>
        `;

        card.querySelector('.toggle-read').addEventListener('click', () => {
            book.toggleRead();
            displayBooks();
        });

        card.querySelector('.remove').addEventListener('click', () => {
            const index = myLibrary.findIndex(b => b.id === book.id);
            myLibrary.splice(index, 1);
            displayBooks();
        });

        librosDiv.appendChild(card);
    });
}

const dialog = document.getElementById('dialog');
const newBookBtn = document.getElementById('newbook');
const form = document.getElementById('form');

newBookBtn.addEventListener('click', () => {
    dialog.showModal();
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    addBookToLibrary(title, author, pages, read);
    form.reset();
    dialog.close();
});

document.getElementById('cancel').addEventListener('click', () => {
    form.reset();
    dialog.close();
});
