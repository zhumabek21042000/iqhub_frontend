import React, { useState, useEffect, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import {useCookies} from 'react-cookie';

import CourseService from '../../../services/spring-service';

const AddUser = () =>{
    let history = useHistory();
    // const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);

 

    const [email, setEmail] = useState("");
    const [usersname, setUsersname] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = event =>{
        setEmail(event.target.value);
    }

    const handleNameChange = event =>{
        setUsersname(event.target.value);
    }

    const handlePasswordChange = event =>{
        setPassword(event.target.value);
    }

    const handleSubmit = event =>{
        const inputData = {email, usersname, password};
        auth(inputData);
        event.preventDefault();
    }

    async function auth(data){
        CourseService.register(data);
        history.push("/adminpanel/users");
        window.location.reload();
    }

    return (
        // <div className = "container">
            <div className = "row">
                <div className = "col-6 offset-3 mt-5">
                    <h3>Добавление нового пользователя</h3>
                    <form onSubmit = {handleSubmit}>
                        <div className = "form-group">
                            <label>
                                Почта : 
                            </label>
                            <input type = "email" className = "form-control" value = {email} onChange = {handleEmailChange}/>
                        </div>
                        <div className = "form-group">
                            <label>
                                Никнейм :
                            </label>
                            <input type = "text" className = "form-control" value = {usersname} onChange = {handleNameChange}/>
                        </div>
                        <div className = "form-group">
                            <label>
                                Пароль : 
                            </label>
                            <input type = "password" className = "form-control" value = {password} onChange = {handlePasswordChange}/>
                        </div>
                        <div className = "form-group">
                            <button className = "btn btn-success mt-2" >Добавить</button>
                            &nbsp;
                            <button className = "btn btn-warning mt-2" onClick={()=>history.push("/adminpanel/users")}>Назад</button>
                        </div>
                    </form>
                </div>
            </div>
        // </div>
    )
}

export default (AddUser);