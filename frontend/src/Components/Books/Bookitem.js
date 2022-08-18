import React, { useContext, useEffect, useRef, useState } from 'react'
import bookContext from '../../Context/bookContext';
const Bookitem = (props) => {
    
  const context = useContext(bookContext);
  const [editbook, seteditbook] = useState({name : "", imageurl : "", author : "", pages : "", price : "" })
  const onChange = (e) => {
    seteditbook({ ...editbook, [e.target.name]: e.target.value })
  }

  const { key, data } = props;

  const { editBook, deleteBook } = context;
  const editmybook = (e) => {
    e.preventDefault();
    editBook(data._id, editbook.name, editbook.imageurl, editbook.author, editbook.pages, editbook.price);
    seteditbook({ ...editbook, [e.target.name]: e.target.value })
    }
    const deletemybook = () => {
        deleteBook(data._id);
}
  return (
      <>
          <div className="container my-5">
          <div className="card" style={{ "width": "18rem" }}>
            <img src={data.imageurl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">Name : {data.name}</h5>
                  <p className="card-text">Author : {data.author}</p>
                  <p className="card-text">Price : {data.price}</p>
                      <p className="card-text">Pages : {data.pages}</p>
                      
                      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal1">
          Edit Book
                      </button>
                      <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Book</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <label htmlFor="exampleInputEmail1" className="form-label"> <b> Name</b></label>
                
                <input type="text" className="form-control for-email" style={{ borderRadius: "10px" }} defaultValue={editbook.name} onChange={onChange} id="emailHelp" name="name" placeholder="Enter name of book"
                  aria-describedby="emailHelp" autoComplete="on" />
                
                <label htmlFor="exampleInputEmail1" className="form-label"> <b> Image Url</b></label>

                <input type="text" className="form-control for-email" style={{ borderRadius: "10px" }} value={editbook.imageurl} onChange={onChange} id="emailHelp" name="imageurl" placeholder="Enter Image URL of book" aria-describedby="emailHelp" autoComplete="on" />

                <label htmlFor="exampleInputEmail1" className="form-label"> <b> Author</b></label>

                <input type="text" className="form-control for-email" style={{ borderRadius: "10px" }} value={editbook.author} onChange={onChange} id="emailHelp" name="author" placeholder="Enter Author of book" aria-describedby="emailHelp" autoComplete="on" />

                <label htmlFor="exampleInputEmail1" className="form-label"> <b> Pages</b></label>

                <input type="number" className="form-control for-email" style={{ borderRadius: "10px" }} value={editbook.pages} onChange={onChange} id="emailHelp" name="pages" placeholder="Enter Pages of book" aria-describedby="emailHelp" autoComplete="on" />

                <label htmlFor="exampleInputEmail1" className="form-label"> <b> Prices</b></label>

                <input type="number" className="form-control for-email" style={{ borderRadius: "10px" }} value={editbook.price} onChange={onChange} id="emailHelp" name="price" placeholder="Enter Price of book" aria-describedby="emailHelp" autoComplete="on" />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={editmybook}>Save changes</button>
              </div>
            </div>
          </div>
                      </div>
                      <button type = "button" className="btn btn-primary mx-2" onClick = {deletemybook}>Delete</button>

       
            </div>
              </div>
              </div>
      </>
  )
}

export default Bookitem