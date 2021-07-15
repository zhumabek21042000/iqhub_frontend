// import {AuthContext, UserDataContext} from "../app/";
import {Link, NavLink, useHistory} from 'react-router-dom';
import React, {useContext,useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import CourseService from '../../services/spring-service';
import { set } from 'lodash';

const NavBar=(props)=> {
    let history = useHistory();
    // const {cookieJWT, removeCookieJWT} =  useContext(AuthContext);
    // const {userData, setuserData} = useContext(UserDataContext)

    const handleLogoutClick = event =>{
        // removeCookieJWT('jwt');
        localStorage.setItem("token", null);
        window.location.replace("/login");
        
    }
  
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState();
    const [usersname, setUsersname] = useState('')

    useEffect(() => {
         CourseService.getCurrentUser().then((response)=>{
        //   if (CourseService.checkJWT() === true){
                setUser(response.data);
                setUsersname(response.data.usersname)
                const user = response.data;
                let userRoles = user.roles;
                for(let i = 0; i < userRoles.length;i++){
                    if(userRoles[i]['role'] === "ROLE_ADMIN"){
                        setIsAdmin(true);
                    }
                  }
                if(!localStorage.getItem("token")){
                    setIsAdmin(false);
                }
        // }
    }).catch(function(error){
          if(error.response){
              if(error.response.status === 500){
                window.onload = function(){
                  if(!window.location.hash){
                    history.push("/login");
                    alert("Пройдите авторизацию еще раз")
                    window.location = window.location+'#smile';
                    window.location.reload();
                  }
                }
                // logout();
                // history.push("/login");
                // alert("Пройдите авторизацию еще раз")
              }
          }
          
        })
        
        if(!localStorage.getItem("token")){
          history.push("/login");
      }
        // window.onload = function(){
        //   if(!window.location.hash){
        //     window.location = window.location+'#smile';
        //     window.location.reload();
        //   }
        // }
    }, [])
    function logout() {
      CourseService.logout();
      history.push("/login");
      window.location.reload();
}
    return(<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
    <Link to="/" className="navbar-brand">IQHub Platform</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <NavLink to="/" className="nav-link">Главная страница</NavLink>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="https://www.iqhub.tilda.ws">Наш сайт</a>
        </li>
      </ul>
    
    </div>
    {props.token ? 
    <>
     <ul className="navbar-nav float-right">
    <Link to="/profile" activeClassName="nav-link active" className="nav-link" style={{color:"white"}}>
        Профиль <i>{usersname}</i>
    </Link>

    <Link to="/login" activeClassName="nav-link active" className="nav-link" style={{color:"white"}} onClick={logout}>
        Выйти
    </Link>
    {isAdmin && 
      <Link to="/adminpanel/courses" activeClassName="nav-link active" className="nav-link" style={{color:"white"}}>
      Админ панель
  </Link>
    }
    
</ul>
  
    {/* <h3 style={{color:"white"}}>Welcome!</h3>  */}
    </>
          :
     <ul className="navbar-nav">
        <li className="nav-item active">
        <NavLink to="/login" className="nav-link">Вход</NavLink>
        </li>
      </ul>}
  
    </div>
  </nav>)
}
export default NavBar;
