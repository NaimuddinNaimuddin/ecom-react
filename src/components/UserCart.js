import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


function UserCart() {
    const navigate = useNavigate()
    const [data, setData] = useState([])


    useEffect(() => {
        const data = { userId: localStorage.getItem('userId') }
        const headers = { Authorization: localStorage.getItem('token') }
        axios.post('http://localhost:3001/get-user-cart', data, { headers })
            .then(res => {
                console.log(res.data, "15")
                setData(res.data.data.cart)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleOpenRazorpay = (data) => {

        const options = {
            key: 'rzp_test_9e9h7K87g5yKdi',
            amount: Number(data.amount),
            currency: data.currency,
            order_id: data.id,
            name: 'SHOPPING APP',//
            description: 'XYZ',//
            handler: function (response) {
                console.log(response, "34")
                axios.post('http://localhost:3001/verify', { response: response })
                    .then(res => {
                        console.log(res, "37")
                        // your orders
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }

        }
        const rzp = new window.Razorpay(options)
        rzp.open()

    }

    const handlePayment = (amount) => {
        const _data = { amount: amount }
        axios.post('http://localhost:3001/orders', _data)
            .then(res => {
                console.log(res.data, "29")
                handleOpenRazorpay(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            home
            <button onClick={() => {
                localStorage.clear()
                navigate('/login')
            }} > Logout </button>


            <h1>PRODUCT LIST</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>


                {data.map((item, index) => {
                    return <div style={{
                        margin: '50px 30px',
                        background: '#eee',
                        width: '27%'
                    }}>
                        <img style={{
                            width: '100%',
                            height: '300px'
                        }} src={item.url} />
                        <p>{item.name} in {item.category}</p>
                        <p>  By {item.seller} </p>
                        <p> PRICE : {item.price} Only/- </p>
                        <button onClick={() => handlePayment(item.price)}> PAY NOW </button>
                    </div>
                })}
            </div>

        </div>
    )
}


export default UserCart