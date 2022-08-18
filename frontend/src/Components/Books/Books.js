import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import './Bookstyle.css'
import bookContext from '../../Context/bookContext';
import Bookitem from './Bookitem';
import axios from 'axios';

const Book = ({ currentcurrency }) => {


  const [currentBalance, setcurrentBalance] = useState(0)


  const context = useContext(bookContext);
  // eslint-disable-next-line
  const { books, getBooks, editBook } = context;
  useEffect(() => {
    if (localStorage.getItem('token'))
    {
       getBooks()
      }
   
    // eslint-disable-next-line
  }, [])
  // eslint-disable-next-line
  const ref = useRef(null)
  // eslint-disable-next-line
  const refClose = useRef(null)
  // console.log(books.length)

  const { addBook } = context;

  const [book, setBook] = useState({ coinid: "", amount: "" })


  const handleClick = async (e) => {
    e.preventDefault();
    addBook(book.coinid, book.amount);
    setBook({ coinid: "", amount: "" })
    // console.log(book.amount)
    const response = await axios.get("http://api.coingecko.com/api/v3/coins/markets", {
      params: {
        vs_currency: currentcurrency,
        ids: book.coinid
      }
    })
    setcurrentBalance(currentBalance + (response.data[0].current_price * book.amount))
    localStorage.setItem('currentBalance', currentBalance)
  }
  const onChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value })
  }





  const renderIfloggedin = () => {
    return (
      <div style={{ height: "fit-content" }}>
        <div className="grid full-width-layout">
          <div className="inner-container">
            <div className="link-main-container">
              <div className="link-container-1">
                <div className="link-container-2">
                  <a className="link-class-1" href="/Home">
                    Home &nbsp;
                  </a>
                  <i className="fas fa-chevron-right" aria-hidden="true">
                  </i>
                  <span fontSize="2,3" color="text" className="link-class-1">
                    Book
                  </span>
                </div>
              </div>
            </div>
            <div className="book-container">
              <div display="flex" className="book-innner-container">
                <div className="leftcontainer showBook" style={{ display: "block" }}>
                  <div display="flex" className="left-innner-container" style={{ marginBottom: "26px" }}>
                    <div className="display-100">
                      <div>
                        <div data-rbd-droppable-id="droppable" data-rbd-droppable-context-id="1">
                          <div data-rbd-draggable-context-id="1" data-rbd-draggable-id="614238c83a7b285d2f55b044" className="left-innner-upper-container">
                            <div className="my-main-book">
                              <div className="my-main-book-logo" style={{ backgroundColor: "rgb(35, 220, 245)" }}>
                                M
                              </div>
                              <div style={{ display: "block" }}>
                                <p style={{ display: "flex", alignItems: "center" }}>
                                  <span style={{ marginRight: "5px" }}>
                                    <b>My Main Book</b>

                                  </span>
                                </p>
                                <p>
                                  <b>{(currentcurrency === "inr") ? "₹" : "$"}&nbsp;{currentBalance}</b>

                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <div className="right-container" style={{ overflowX: "auto" }}>
                  <div style={{ position: "absolute", left: "-10000px" }}>
                  </div>
                  <div style={{ position: "initial", left: "0px" }}>
                    <div className="current-balance-container">
                      <p color="neutral6" fontSize="1" className="current-balance-headline-container">
                        <span className="current-balance-headline">
                          <b>Current Balance</b>
                        </span>
                      </p>
                      <div display="flex" height="48" className="amount-container">
                        <div display="flex" width="1,1,auto" className="amount-container-left">
                          <div className="price">
                            <b>{(currentcurrency === "inr") ? "₹" : "$"}&nbsp;{currentBalance}</b>

                          </div>
                        </div>
                        <div display="none,none,flex" className="add-new">
                          <input type="text" className="form-control m-3" id="coinid" placeholder="Name a coin" name="coinid" aria-describedby="emailHelp" value={book.coinid.toLowerCase()} onChange={onChange} minLength={5} required autoFocus={true} />

                          <input type="text" className="form-control m-3" id="amount" placeholder="Amount" name="amount" value={book.amount} onChange={onChange} minLength={5} required />
                          <button className="btn btn-primary plus-sign-container" onClick={handleClick}>
                            Add


                          </button>
                        </div>
                      </div>

                    </div>
                    <div display="none,none,flex" className="add-new-2">
                      <input type="text" className="form-control m-3" id="coinid" placeholder="Name a coin" name="coinid" aria-describedby="emailHelp" value={book.coinid} onChange={onChange} minLength={5} required />
                      <input type="text" className="form-control m-3" id="amount" placeholder="Amount" name="amount" value={book.amount} onChange={onChange} minLength={5} required />
                      <button className="btn btn-primary plus-sign-container" onClick={handleClick}>
                        Add


                      </button>
                    </div>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Remove</th>
                          <th scope="col">CoinName</th>
                          <th scope="col">Holdings</th>
                          <th scope="col">Price per Coin</th>
                          <th scope="col">Total Amount</th>

                        </tr>
                      </thead>
                    </table>
                    {books.length === 0 ?
                      <div className="right-down-container">
                        <div className="book-empty-box">
                          <div className="p-e-coinid">
                            <b> This book is empty</b>

                          </div>
                          <div className="p-e-subcoinid">
                            <b> Add any coin to get started</b>

                          </div>

                        </div>
                      </div>
                      :





                      books.map((book) => {
                        return <Bookitem key={book._id} currentcurrency={currentcurrency} currentBalance={currentBalance} setcurrentBalance={setcurrentBalance} book={book} />
                      })

                    }


                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {renderIfloggedin()}
    </div>

  )
}

export default Book