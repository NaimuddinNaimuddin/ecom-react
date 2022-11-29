import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


function GetProduct() {
    const navigate = useNavigate()
    const params = useParams()
    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [seller, setSeller] = useState('')
    const [price, setPrice] = useState('')

    useEffect(() => {
        const id = params.id
        axios.get(`http://localhost:3001/get-product/${id}`)
            .then(res => {
                console.log(res.data.data, "13")
                setImage(res.data.data.url)
                setName(res.data.data.name)
                setCategory(res.data.data.category)
                setSeller(res.data.data.seller)
                setPrice(res.data.data.price)
            })
            .catch(err => {
                console.log(err, "err")
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({ id: params.id, url: image, name, category, seller, price: Number(price) })

        const data = { id: params.id, url: image, name, category, seller, price: Number(price) }
        axios.post('http://localhost:3001/edit-products', data)
            .then(res => {
                console.log(res.data, "res")
                if (res.data.code == 200) {
                    navigate('/get/products')
                }
            })
            .catch(err => {
                console.log(err, "err")
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                Image :
                <input
                    className="inputs"
                    type="text"
                    onChange={(e) => setImage(e.target.value)}
                    value={image} />
                <br />

                Name :  <input className="inputs"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name} /> <br />

                category :    <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="inputs"
                    type="text" /> <br />

                Seller :    <input
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                    className="inputs" type="text" /> <br />

                Price :    <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="inputs" type="number" /> <br />

                <button type="submit"> Submit </button>
            </form>
        </div>
    )
}

export default GetProduct