import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const host = "http://localhost:5000"

function Login(props) {

    const [credentials, setCredentials] = useState({email:"", password:""})
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            history.push("/");
            props.showAlert("Logged in successfully", "success")
        } else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value })
      }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" name='email' id="email" onChange={onChange} value={credentials.email}aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name='password' id="password" onChange={onChange} value={credentials.password}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Login