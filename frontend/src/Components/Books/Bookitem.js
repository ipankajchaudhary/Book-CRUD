
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import bookContext from '../../Context/bookContext';


const Bookitem = (props) => {
    const context = useContext(bookContext);
    const { deleteBook } = context;
    // eslint-disable-next-line
    const { book, updateBook } = props;
    const { currentBalance, setcurrentBalance , currentcurrency} = props;
    const [coins, setCoins] = useState([])


    useEffect(() => {

        const fetchData1 = async () => {
            const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
                params: {
                    vs_currency: currentcurrency,
                    ids: book.coinid
                }
            })
            setCoins(response.data);
        }
        fetchData1();
        // eslint-disable-next-line
    }, [currentcurrency])

    const handledelete = () => {
        if (coins[0]) {
            setcurrentBalance(currentBalance - (book.amount * coins[0].current_price))
            localStorage.setItem('currentBalance', currentBalance)
            deleteBook(book._id)
        }
    }
    var stylingObject = {
        td: {
            textAlign:"left"
        },
        dw:{
            textAlign:"left",
            width: "16%"
        }
    }
    const render = () => {
        if (book.coinid && coins[0]) {
            return (<>
                    <table className="table container">
                        <tbody>
                            <tr >
                                <td style={stylingObject.dw}><i className="far fa-trash-alt mx-2" onClick={handledelete}></i></td>
                                <td style={stylingObject.td}>{book.coinid}</td>
                                <td style={stylingObject.td}>{book.amount}</td>
                                <td style={stylingObject.td}>{(currentcurrency==="inr")?"₹":"$"}&nbsp;{coins[0].current_price}</td>
                                <td style={stylingObject.td}>{(currentcurrency==="inr")?"₹":"$"}&nbsp;{book.amount * coins[0].current_price}</td>
                            </tr>
                        </tbody>
                    </table>
                </>

            )
        }
    }


    return (
        <>   {render()}
        </>
    )
}

export default Bookitem