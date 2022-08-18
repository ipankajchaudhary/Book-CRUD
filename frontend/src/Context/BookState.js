import BookContext from "./bookContext";
import {  useState } from "react";

const BookState = (props) => {
  const host = 
    // "https://git.heroku.com/my--crypto.git"
    "http://localhost:5000"
  const booksInitial = []
  const [books, setBooks] = useState(booksInitial)

  // Get all Books
  const getBooks = async () => {
    // API Call 
    const response = await fetch(`${host}/api/book/fetchallbooks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json() 
    setBooks(json)
  }

  // Add a Book
  const addBook = async (coinid, amount) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/book/addbook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({coinid, amount})
    });

    const book = await response.json();
    setBooks(books.concat(book))
  }

  // Delete a Book
  const deleteBook = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/book/deletebook/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    // eslint-disable-next-line
    const json = response.json(); 
    const newBooks = books.filter((book) => { return book._id !== id })
    setBooks(newBooks)
  }

  // Edit a Book
  const editBook = async (id, coinid, amount) => {
    // API Call 
    const response = await fetch(`${host}/api/book/updatebook/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({coinid, amount})
    });
    // eslint-disable-next-line
    const json = await response.json(); 

     let newBooks = JSON.parse(JSON.stringify(books))
    // Logic to edit in client
    for (let index = 0; index < newBooks.length; index++) {
      const element = newBooks[index];
      if (element._id === id) {
        newBooks[index].coinid = coinid;
        newBooks[index].amount = amount;
        break; 
      }
    }  
    setBooks(newBooks);
  }
 
  return (
    <BookContext.Provider value={{ books, addBook, deleteBook, editBook, getBooks }}>
      {props.children}
    </BookContext.Provider>
  )

}
export default BookState;