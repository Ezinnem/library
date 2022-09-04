//Create the book class with the properties of author, title, isbn

class Book {
    constructor(title, author, isbn) {
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

//User interface operations

class showList {
    static displayBooks() {
        const books = []

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
        showList.showAlert("Book added successfully", 'success')
    }

    showList.clearFields();
})

//Remove a book

document.getElementById("book-list").addEventListener("click", function(e) {
    showList.showAlert("Book is removed", 'danger')
    showList.deleteBook(e.target)
})




