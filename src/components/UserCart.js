import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


function UserCart() {
    const navigate = useNavigate()
    const [data, setData] = useState([])


    useEffect(() => {
        const data = { userId: localStorage.getItem('userId') }
        axios.post('http://localhost:3001/get-user-cart', data)
            .then(res => {
                console.log(res.data, "15")
                setData(res.data.data.cart)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

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
                    </div>
                })}
            </div>

        </div>
    )
}


export default UserCart