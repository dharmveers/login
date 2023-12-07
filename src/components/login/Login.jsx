import React, { useState } from 'react';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import '../login/login-style.css';
import Validation from '../../Validation';
const Login = () => {
    let navigate=useNavigate();
    const [visible, setVisible] = useState(false);
    const[errors,setErrors] = useState({});
    const[user,setUser] = useState({
        userid:"",
        pass:""
    });

    function handleInput(e) {
        setUser({...user,[e.target.name]:e.target.value})
        setErrors("")
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setErrors(Validation(user))
    try {
        let result = await fetch(`http://localhost:8000/getUser/${user.userid}`, {
                method: "get",
                headers: {
                    'content-type': 'application/json'
                }
            });
            result = await result.json();
            console.log(result);
            if (user.userid === result.userID && user.pass === result.userPass) {
                toast.success("login Successfully", {
                    position: "top-center"
                });
                navigate("/");
            } else {
                toast.error("email not registered", {
                    position: "top-center"
                });
            }
    } catch (error) {
        toast.error("500: Internal Server Error"+error,{
            position:"top-center"
        })
    }
            
        

    }
    return (
        <div className="log-container">
            <div className="form-box">
                <form onSubmit={handleFormSubmit}>
                    <h1>LOGIN</h1>
                    <div className='login-form-input'>
                        <label htmlFor="userid">Email address</label>
                        <div className="log-input">
                            <input onChange={handleInput} type="text" className="form-control" placeholder="Username" value={user.userid} name='userid' required />
                        </div>
                    </div>
                    {errors.userid && <p style={{ color: "red" }}>{errors.userid}</p>}
                    <div className='login-form-input'>
                        <label htmlFor="pass">Password</label>
                        <div className="log-input">
                            <input type={visible ? 'text' : "password"} onChange={handleInput} className="form-control" placeholder="*******" name='pass' value={user.pass} required />
                            {
                                visible ? <EyeOutlined style={{marginTop:"7px"}} onClick={() => setVisible(!visible)} /> : <EyeInvisibleOutlined style={{marginTop:"7px"}} onClick={() => setVisible(!visible)} />
                            }
                        </div>
                    </div>
                    {errors.pass && <p style={{ color: "red" }}>{errors.pass}</p>}
                    <div className="message">
                        <div><input type="checkbox" />Remember Me</div>
                        <div><span>Forget password?</span></div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <button type="submit">LOGIN</button>
                        <div style={{ marginTop: "80px" }}>Not Registered?<Link to="/register" tag="a" action><span style={{ color: "red", fontWeight: "bold", cursor: "pointer" }}>Click here to join</span></Link></div>
                    </div>

                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login;