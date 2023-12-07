import React, { useState } from 'react';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import "../register/register-style.css";
import Validation from '../../Validation';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const Register = () => {
    const [user, setUser] = useState(
        {
            username: "",
            userid: "",
            pass: "",
            rePass: "",
            role: ""
        }
    );
    const [errors, setErrors] = useState({});
    const [visible, setVisible] = useState(false);
    const handleInputs = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
        setErrors("");
    }
   function handleValidation(e) {
        e.preventDefault()
        setErrors(Validation(user))
        try{
          let data={
            userName:user.username,
            userID:user.userid,
            userPass:user.pass,
            userRole:user.role
           }
           console.log(data)
            axios.post("http://localhost:8000/addUser",data)
                    .then(Response=>{
                        //console.log(Response);
                        toast.success("User Added Successfully",{
                            position:"top-center"
                        });
                    })
                    .catch(errors=>{
                        //console.log(errors)
                        toast.error("500:Internal Server Error : "+errors,{
                            position:"top-center"
                        });
                    });
        }catch(error){
            toast.error("500: Internal Server Error"+error,{
                position:"top-center"
            })
        }
    }
    return (
        <div className="reg-container">
            <div className="header mt-3">
                <div className="title"><h1>Registration Form</h1></div>
                <div className="underline"></div>
            </div>
            <div className="form-input">
                <form onSubmit={handleValidation}>
                    <div className="input">
                        <label htmlFor="username">User Name*</label>
                        <input type="text" value={user.username} name="username" onChange={handleInputs} />
                    </div>
                    {errors.username && <p style={{color:"red"}}>{errors.username}</p>}
                    <div className="input">
                        <label htmlFor="userid">Email*</label>
                        <input type="text" value={user.userid} name='userid' onChange={handleInputs} />
                    </div>
                    {errors.userid && <p style={{color:"red"}}>{errors.userid}</p>}
                    <div className="input">
                        <label htmlFor="pass">Password*</label>
                        <input type={visible ? "text" : "password"}value={user.pass} name='pass' onChange={handleInputs} />
                        {
                            visible ? <EyeOutlined onClick={() => setVisible(!visible)} /> : <EyeInvisibleOutlined onClick={() => setVisible(!visible)} />
                        }
                    </div>
                    {errors.pass && <p style={{color:"red"}}>{errors.pass}</p>}
                    <div className="input">
                        <label htmlFor="rePass">Confirm Password*</label>
                        <input type={visible?"text":"password"} value={user.rePass} name='rePass' onChange={handleInputs} />
                    </div>
                    {errors.rePass && <p style={{color:"red"}}>{errors.rePass}</p>}
                    <div className="input">
                        <label htmlFor="role">Role</label>
                        <input type="text" value={user.role} name='role' onChange={handleInputs} />
                    </div>
                    <div style={{ textAlign: "center" }}>
                    <button type='submit'>Submit</button>
                        <div style={{ marginTop: "45px" }}>Already Registered?<Link to="/login" tag="a" action><span style={{ color: "blue", fontWeight: "bold", cursor: "pointer" }}>Click here to Login</span></Link></div>
                    </div>
                </form>

            </div>
            <ToastContainer/>
        </div>
    );
}

export default Register;