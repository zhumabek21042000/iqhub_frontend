import React, { useState, useEffect, useContext} from 'react';
import {useCookies} from 'react-cookie';
import UserContext from "./UserContext";
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams, useHistory
} from "react-router-dom";
import CourseService from "../../services/spring-service";


const Login = ({authUsr}) => {

    const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);

    let history = useHistory();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = event =>{
        setEmail(event.target.value);
    }

    const handlePasswordChange = event =>{
        setPassword(event.target.value);
    }

    const handleSubmit = event =>{
        setLoading(true);
        event.preventDefault();
        const inputData = {email, password};
        CourseService.login(inputData)
            .then(async res=>{
                setLoading(false);
                await history.push("/");
                window.location.reload();
                alert("Вы успешно вошли в систему!")
                
                console.log("Posle PUSH");
                

            
            }).catch(error => {
                alert("Неправильный логин или пароль")
                setLoading(false);
            });

    }
    // useEffect( async()=>{
    //     if(!localStorage.getItem("token")){
    //         setLoading(true)
    //     }
    // })
    return (
        <>
        {loading ? <div class="text-center mt-5">
  <div class="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
    <span class="sr-only"></span>
  </div>
</div> :
        <div className = "container">
            <div className = "row mt-3">
                <div className = "col-lg-5 mx-auto">
                    <form onSubmit = {handleSubmit}>
                        <div className = "form-group">
                            <label>
                                Почта : 
                            </label>
                            <input type = "email" className = "form-control" value = {email} onChange = {handleEmailChange}/>
                        </div>
                        <div className = "form-group">
                            <label>
                                Пароль : 
                            </label>
                            <input type = "password" className = "form-control" value = {password} onChange = {handlePasswordChange}/>
                        </div>
                        <div className = "form-group mt-2">
                            <button className = "btn btn-primary" >Войти</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
}
    </>)
}

export default Login;
