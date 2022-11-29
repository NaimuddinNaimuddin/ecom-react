import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


function Home() {
    const navigate = useNavigate()
    const [data, setData] = useState([
        {
            url: 'https://rukminim1.flixcart.com/image/300/300/l51d30w0/shoe/z/w/c/10-mrj1914-10-aadi-white-black-red-original-imagft9k9hydnfjp.jpeg?q=70',
            name: 'TRQ White Shoes',
            category: 'Shoes',
            seller: 'AMZ Seller Ghz',
            price: 1999
        },
        {
            url: 'https://5.imimg.com/data5/KC/PC/MY-38629861/dummy-chronograph-watch-500x500.jpg',
            name: 'LOREM Watch Black',
            category: 'Watches',
            seller: 'Watch Ltd Siyana',
            price: 2599
        },
        {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq39iB_cO6uhZ59vubrqVuYTJQH-4Qa0hU9g&usqp=CAU',
            name: 'AMZ Laptop 8GB RAM',
            category: 'Laptops',
            seller: 'Delhi Laptops',
            price: 50000
        },
        {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfvoDzLqrT7GwU3z7Ccp0Cl9rV0ZnU9DcmEg&usqp=CAU',
            name: 'Security Camera',
            category: 'CCTV',
            seller: 'Camron LTD',
            price: 4000
        },
        {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG9e8Axt-h9q8EIybKfjGzbkIWJAr50_BX7Q&usqp=CAU',
            name: 'Watch Pink',
            category: 'Watches',
            seller: 'Watch Ltd',
            price: 2000
        },
        {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9xzgtOpMxdpfgBOg3OKsEqYRkNBbuprJj4w&usqp=CAU',
            name: 'Cup red Color',
            category: 'Cup',
            seller: 'ABS Ltd',
            price: 100
        },])
    useEffect(() => {
        // if (!localStorage.getItem('token')) {
        //     navigate('/login')
        // }
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

export default Home