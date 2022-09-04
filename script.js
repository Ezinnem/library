//Create the book class with the properties of author, title, isbn

class Book {
    constructor(title, author, isbn) {
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

class Store {
    static getBooks(){
        let books;

        if(localStorage.getItem('books') === null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        
        localStorage.setItem("books", JSON.stringify(books))
    }

    static removeBook(isbn){
        const books = Store.getBooks()

        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1)
            }
        })
        localStorage.setItem("books", JSON.stringify(books))

    }
}
//User interface operations

class showList {
    static displayBooks() {
        const books =   Store.getBooks()

        books.forEach((book) => showList.addToBookList(book))
    }

    static addToBookList(book) {
        const list = document.getElementById("book-list");
        const row = document.createElement("tr")

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `

        list.appendChild(row)
    }

    static clearFields(){
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("isbn").value = "";

    }

    static showAlert (message, className){
        
        // const div = document.getElementById('alert');
        const div = document.createElement("div")
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('[id*="container"]');

        const form = document.querySelector('[id*="book-form"]');

        container.insertBefore(div, form)

        setTimeout(() => {
            div.remove()
        }, 1000);
    }

    static deleteBook (book){

        if(book.classList.contains("delete")){
            book.parentElement.parentElement.remove()
        }

    }




}
document.addEventListener('DOMContentLoaded', showList.displayBooks());

//Add a book

document.addEventListener("submit", function (e){
    e.preventDefault();

    const bookTitle = document.getElementById("title").value;
    const bookAuthor = document.getElementById("author").value;
    const bookisbn = document.getElementById("isbn").value;

    if(bookTitle === "" || bookAuthor === '' || bookisbn === ''){
        showList.showAlert("Please enter all the details", 'danger');
    } else {
        const book = new Book(bookTitle, bookAuthor, bookisbn);

        showList.addToBookList(book);
        Store.addBook(book);
        showList.showAlert("Book added successfully", 'success')
    }

    showList.clearFields();
})

//Remove a book

document.getElementById("book-list").addEventListener("click", function(e) {
    
    showList.deleteBook(e.target)
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    showList.showAlert("Book is removed", 'Book has been deleted')
})




