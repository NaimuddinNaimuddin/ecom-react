import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

function Signup() {
    const navigate = useNavigate()


    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType] = useState('')

    const handleSignup = () => {
        console.log(userName, password)

        const data = { name: userName, password: password, type }
        axios.post('http://localhost:3001/signup', data)
            .then((res) => {
                console.log(res.data, 17)
                if (res.data.code == 200) {
                    navigate('/login')
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
                <h1> Signup PAGE</h1>
                <div> <Link to="/login"> LOGIN </Link> </div>
                USERNAME -
                <input type="text" value={userName} onChange={(e) => {
                    setUserName(e.target.value)
                }} />   <br />  <br />
                PASSWORD -
                <input type="text" value={password} onChange={(e) => {
                    setPassword(e.target.value)
                }} />   <br />  <br />
                USER TYPE -
                <input type="text" value={type} onChange={(e) => {
                    setType(e.target.value)
                }} />   <br />  <br />

                <button onClick={handleSignup}> SUBMIT </button>
            </div>
        </div>
    )
}

export default Signup