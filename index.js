import Book from './modules/books.js';
import {initialise, navigate} from './modules/accessories.js'
import { DateTime } from "./modules/luxon/src/luxon.js";

const navList = Array.from(document.querySelectorAll('.nav-links')[0].children);
const homePage = document.getElementById('home');
const form = document.querySelector('.add-new');
const bookSection = document.querySelector('.book-list');
const contactSection = document.querySelector('.contact-section');
const dateSection = document.querySelector(".date");

window.addEventListener('DOMContentLoaded', () => {

  const bookTitle = document.getElementById('title');
  const bookAuthor = document.getElementById('author');

  class Library {
    constructor() {
      this.library = JSON.parse(localStorage.getItem('bookCollection')) || [];
    }

    addBook(bookTitle, bookAuthor) {
      const selectedBook = new Book(bookTitle.value, bookAuthor.value);
      this.library.push(selectedBook);
      this.createBook();
    }

    createBook() {
      bookSection.innerHTML = '';
      const bookListHeader = document.createElement('h2');
      const bookTable = document.createElement('table');
      bookListHeader.textContent = 'All awesome books';
      bookSection.appendChild(bookListHeader);
      bookSection.appendChild(bookTable);

      for (let i = 0; i < this.library.length; i += 1) {
        const bookContainer = document.createElement('tr');
        const bookInfo = document.createElement('p');
        bookInfo.setAttribute('class', 'list-content')
        const deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('class', 'deletebtn');
        deleteBtn.setAttribute('data', i);

        bookInfo.textContent = `'${this.library[i].title}' authored by ${this.library[i].author}`;
        deleteBtn.textContent = 'Remove';
        bookContainer.appendChild(bookInfo);
        bookContainer.appendChild(deleteBtn);
        bookTable.appendChild(bookContainer);
      }
      this.deleteBook();
    }

    deleteBook() {
      [...document.querySelectorAll('.deletebtn')].forEach((element) => {
        const elementIndex = parseInt(element.getAttribute('data'), 10);
        element.addEventListener('click', () => {
          this.library.splice(elementIndex, 1);
          localStorage.setItem('bookCollection', JSON.stringify(this.library));
          this.createBook();
        });
      });
    }
  }
  
  const myLibrary = new Library();

  myLibrary.createBook();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (bookTitle.value === '' || bookAuthor.value === '') {
      return;
    }
    myLibrary.addBook(bookTitle, bookAuthor);
    localStorage.setItem('bookCollection', JSON.stringify(myLibrary.library));
    bookTitle.value = '';
    bookAuthor.value = '';
  });
});

// initialise timer and set interval
let siteTime = () => {
  dateSection.textContent = DateTime.now().toLocaleString({
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

setInterval(siteTime, 1000);


// set initial setup for home page

window.addEventListener('load', (initialise));

// load dynamic html when user clicks a navigation link
navList.forEach((item) => {
  item.addEventListener('click', (e) => {
    navigate(e.target.id);
    navList.forEach((hhh) => {
      hhh.children[0].classList.remove('active');
    });
    item.children[0].classList.add('active');
  });
});

// Display default settings when user clicks nav heading
homePage.addEventListener('click', () => {
  bookSection.classList.remove('hide');
  form.classList.add('hide');
  contactSection.classList.add('hide');
});
