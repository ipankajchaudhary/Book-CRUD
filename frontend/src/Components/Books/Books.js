import React, { useContext, useEffect, useRef, useState } from 'react'
import './Bookstyle.css'
import bookContext from '../../Context/bookContext';
import Bookitem from './Bookitem';
const Books = () => {

  const context = useContext(bookContext);
  // addingbook to add new book
  const [addingbook, setaddingbook] = useState({name : "", imageurl : "", author : "", pages : "", price : "" })
  const onChange = (e) => {
    setaddingbook({ ...addingbook, [e.target.name]: e.target.value })
  }


  const { books,addBook, getBooks } = context;
  const handlesubmit = (e) => {
    e.preventDefault();
    addBook(addingbook.name, addingbook.imageurl, addingbook.author, addingbook.pages, addingbook.price);
    setaddingbook({ ...addingbook, [e.target.name]: e.target.value })
    console.log(books);
  }
  // fetch all books
  getBooks();
  return (
    <>
      <div className="container my-5">
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Add Book
        </button>
        
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add Book</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <label htmlFor="exampleInputEmail1" className="form-label"> <b> Name</b></label>
                
                <input type="text" className="form-control for-email" style={{ borderRadius: "10px" }} defaultValue={addingbook.name} onChange={onChange} id="emailHelp" name="name" placeholder="Enter name of book"
                  aria-describedby="emailHelp" autoComplete="on" />
                
                <label htmlFor="exampleInputEmail1" className="form-label"> <b> Image Url</b></label>

                <input type="text" className="form-control for-email" style={{ borderRadius: "10px" }} value={addingbook.imageurl} onChange={onChange} id="emailHelp" name="imageurl" placeholder="Enter Image URL of book" aria-describedby="emailHelp" autoComplete="on" />

                <label htmlFor="exampleInputEmail1" className="form-label"> <b> Author</b></label>

                <input type="text" className="form-control for-email" style={{ borderRadius: "10px" }} value={addingbook.author} onChange={onChange} id="emailHelp" name="author" placeholder="Enter Author of book" aria-describedby="emailHelp" autoComplete="on" />

                <label htmlFor="exampleInputEmail1" className="form-label"> <b> Pages</b></label>

                <input type="number" className="form-control for-email" style={{ borderRadius: "10px" }} value={addingbook.pages} onChange={onChange} id="emailHelp" name="pages" placeholder="Enter Pages of book" aria-describedby="emailHelp" autoComplete="on" />

                <label htmlFor="exampleInputEmail1" className="form-label"> <b> Prices</b></label>

                <input type="number" className="form-control for-email" style={{ borderRadius: "10px" }} value={addingbook.price} onChange={onChange} id="emailHelp" name="price" placeholder="Enter Price of book" aria-describedby="emailHelp" autoComplete="on" />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={handlesubmit}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
        <div className="container d-flex">
        {books.map((e, id) => {
          return <Bookitem key={e._id} data={e} />
          })}
        </div>
      </div>
    </>
  )
}

export default Books