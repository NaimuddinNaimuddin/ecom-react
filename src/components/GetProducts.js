import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"


function GetProducts() {
    const navigate = useNavigate()
    const rights = JSON.parse(localStorage.getItem('rights'))[0]?.permissions
    console.log(rights, "9")
    const [data, setData] = useState([])
    const [deleteData, setDeleteData] = useState([])

    const [refresh, setRefresh] = useState(false)

    console.log(deleteData, "deletedata")

    console.log(data, "8")
    useEffect(() => {
        const headers = { Authorization: localStorage.getItem('token') }
        axios.get('http://localhost:3001/get-products', { headers })
            .then(res => {
                setData(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [refresh])


    const handleDelete = () => {
        const data = deleteData
        axios.post('http://localhost:3001/delete-products', data)
            .then(res => {
                console.log(res.data, "27")
                if (res.data.code == 200) {
                    setRefresh(!refresh)
                }
            })
            .catch(err => {
                console.log(err, "30")
            })

    }

    const handleAddToCart = (productId) => {
        const _productId = productId
        const userId = localStorage.getItem('userId')

        console.log({ productId: _productId, userId })
        const _data = { productId: _productId, userId }
        const headers = { Authorization: localStorage.getItem('token') }
        axios.post('http://localhost:3001/add-to-cart', _data, { headers })
            .then(res => {
                console.log(res.data, "49")
                if (res.data.code == 200) {
                    setRefresh(!refresh)
                }
            })
            .catch(err => {
                console.log(err, "30")
            })
    }

    return (<>
        <h1 style={{ textAlign: 'center' }}> SHOPPING CART  PRODUCTS </h1>
        <Link to="/get/cart"> GO TO CART </Link>
        {deleteData.length > 0 &&
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button
                    onClick={handleDelete}>DELETE SELECTED </button>
            </div>}
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {
                data &&
                data.length > 0 &&
                data.map((item, index) => {
                    return (
                        <div style={{
                            margin: '30px 30px',
                            // background: '#eee',
                            boxShadow: '1px 1px 1px 1px rgb(0 0 0 / 16%)',
                            width: '15%',
                            borderRadius: '5px'
                        }}>
                            <img style={{
                                width: '100%',
                                height: '150px'
                            }} src={item.url} />
                            <div style={{ marginLeft: '4px' }}>{item.name} in {item.category}</div>
                            <div style={{ color: 'green', marginLeft: "4px" }}>
                                By {item.seller} </div>
                            <div style={{ marginLeft: "4px" }}> PRICE : {item.price} Only/- </div>

                            {rights.indexOf('edit-product') !== -1 && <button onClick={() => {
                                console.log(item._id, "40")
                                navigate(`/get/product/${item._id}`)
                            }}>EDIT</button>}

                            {rights.indexOf('delete-products') !== -1 && <input onChange={(e) => {
                                if (e.target.checked === true) {
                                    setDeleteData([...deleteData, item._id])
                                } else {
                                    setDeleteData(deleteData.filter(s => s !== item._id))
                                }
                            }} type="checkbox" />}
                            <button onClick={() => handleAddToCart(item._id)
                            } > ADD TO CART  </button>
                        </div>
                    )
                })
            }
        </div>
    </>)
}

export default GetProducts