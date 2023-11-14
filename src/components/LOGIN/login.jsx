import React, { useState } from 'react'
import api from '../../routes/api';
import md5 from 'md5'
import { Button, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import './login.css'


export const Login = () => {

    const navegar = useNavigate()

    const [pending, setPending] = useState(false);
    const [errorLogin, setErrorLogin] = useState("")
  
    const iniciarSecion = async () => {
        setPending(true)
        await api.get("/api/users/userlogin",  {params:{name: dataUsers.name.toLowerCase() , password: md5(dataUsers.password)}})
            .then(async (response) => {
                return await response.data;
            })
            .then(async(res)=>{
                if(res[0]){
                    localStorage.setItem("user", JSON.stringify(res[0]))
                    setPending(false)
                    navegar("/home")
                }else{
                    setErrorLogin(<h5 className='mt-3 text-center'>Datos ingresados incorrectos</h5>)
                    setPending(false)
                }
            })
            .catch((error)=>{
                console.error(error)
            })
    }

    const [dataUsers, setDataUSers] = useState({
       name:"",
       password:"",
    }) 

    function handleChange(evt) {
        const value = evt.target.value;
        setDataUSers({
        ...dataUsers,
        [evt.target.name]: value
        });
    }
    

    if(pending){
        return (
                <div className='containerLogin w-100 d-flex flex-column justify-content-center align-items-center'>
                        <Spinner animation="border" variant="primary" />
                </div>        
            )
    }else{

        if(!localStorage.getItem("user")){
            return (
                <div className='containerLogin'>
                    <div className="login-box">
                        <h2>Login</h2>
                        <form>
                            <div className="user-box">
                            <input name="name" type="text" className='nombre' autocomplete="off"  placeholder="Ingrese username" value={dataUsers.name}  onChange={handleChange} onKeyDown={()=>{if(event.key==="Enter"){iniciarSecion()}}}/>
                            <label>Username</label>
                            </div>
                            <div className="user-box">
                            <input name="password" type="password" className='password'placeholder="Ingrese su contraseña" value={dataUsers.password} onKeyDown={()=>{if(event.key==="Enter"){iniciarSecion()}}}onChange={handleChange}/>
                            <label>Password</label>
                            </div>
                            {errorLogin}
                            <a onClick={async ()=>{await iniciarSecion()}} href="#">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Login
                            </a>
                        </form>
                    </div>
                </div> 
        )}else{
            return(<></>)
        }
    }
}
