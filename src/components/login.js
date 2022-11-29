import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

function Login() {
    const navigate = useNavigate()


    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        console.log(userName, password)

        const data = { name: userName, password: password }
        axios.post('http://localhost:3001/login', data)
            .then((res) => {
                console.log(res.data.token, 17)
                if (res.data.token) {
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('userId', res.data.userId)
                    navigate('/get/products')
                }
            })
            .catch((err) => {
                console.log(err, 20)
            })
    }

    return (
        <div style={{
            display: 'flex',
            boxShadow: '1px 1px 1px 1px rgb(0 0 0 / 16%)',
            justifyContent: 'center',
            margin: '50px 70px',
            padding: '30px',
        }}>
            <div>
                <h1> LOGIN PAGE</h1>
                USERNAME -
                <input type="text" value={userName} onChange={(e) => {
                    setUserName(e.target.value)
                }} />   <br />  <br />
                PASSWORD -
                <input type="text" value={password} onChange={(e) => {
                    setPassword(e.target.value)
                }} />   <br />  <br />

                <button onClick={handleLogin}> SUBMIT </button>
            </div>
        </div>
    )
}

export default Login