import React, {useContext, useEffect, useState} from 'react';
// import './app.css';
import {BrowserRouter as Router, Route, Switch, useHistory, withRouter} from 'react-router-dom';
import UserProvider from "../auth/UserProvider";
import UserContext from "../auth/UserContext";
import Main from "./main";
import NavBar from '../layout/NavBar';
import Footer from '../layout/Footer'

const AppMain = () => {

    const [user, setUser] = useState("");

    useEffect(async() => {
       await setUser(localStorage.getItem("token"));
    }, [])


    return (
        <UserProvider>
            <Router>
                <NavBar token={user} />
                <div className="container">
                    <Main/>
                </div>
                <Footer></Footer>
            </Router>
        </UserProvider>
    );
};
export default AppMain;