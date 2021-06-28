import React, {useState, useEffect} from "react";
import CourseService from "../../services/spring-service";
// import {BsFillTrashFill} from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import {RiAddCircleLine} from 'react-icons/ri';
import { useHistory, Link } from "react-router-dom";
const Profile = () =>{
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [usersname, setUsersname] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [email, setEmail] = useState("");
    const [courses, setCourses] = useState([]);
    
    let history = useHistory();
    
    
    useEffect(async()=>{
        setLoading(true);
        await CourseService.getCurrentUser().then((response)=>{
                setUser(response.data);
                setUsersname(response.data.usersname);
                setCourses(response.data.enrolledCourses);
                setEmail(response.data.email);
                setLoading(false);
            
        })
        // await CourseService.getAllCourses().then((response)=>{
        //     setAllCourses(response.data);
        // })
    }, []);



    const handleUsernameChange = event =>{
        // setUser({...user, usersname: event.target.value})
        setUsersname(event.target.value)
    }

    const handleEmailChange = event =>{
        setEmail(event.target.value);
    }

    const handlePasswordChange = event =>{
        setPassword(event.target.value);
    }

    const handleNewPassChange = event =>{
        setNewPassword(event.target.value);
    }

    const emailSubmit = event =>{
        setLoading(true);
        event.preventDefault();
        alert(email);
        CourseService.changeEmail(user.email,email)
            .then(async res=>{
                setLoading(false);
                alert("Почта пользователя успешно изменено!")
                window.location.reload();
            }).catch(error => {
                alert("Упс. Что-то пошло не так :(")
                setLoading(false);
            });

    }

    const handleSubmit = event =>{
        setLoading(true);
        event.preventDefault();
        const userdata = {
            id:user.id,
            email:user.email,
            usersname: usersname
        };
        CourseService.changeName(userdata)
            .then(async res=>{
                setLoading(false);
                alert("Имя пользователя успешно изменено!")
                window.location.reload();
                
            
            }).catch(error => {
                alert("Упс. Что-то пошло не так :(")
                setLoading(false);
            });

    }

    const handlePassSubmit = event =>{
        setLoading(true);
        event.preventDefault();
        const userdata = {
            id:user.id,
            email:user.email,
            password:password,
            usersname:usersname
        };

        CourseService.changePassword(userdata, newPassword)
            .then(async res=>{
                setLoading(false);
                setPassword("");
                setNewPassword("");
                alert("Пароль успешно изменен!")
                // window.location.reload();

            
            }).catch(error => {
                alert("Упс. Что-то пошло не так :(")
                setLoading(false);
            });
    }

    

    return(
        <>
        {!loading ? 
       
        <div className="row mt-3">
            <div className="col-4">
                 <form>
                <div className="form-group">
                        <label>Почта</label>
                        <input disabled={true} value={email} className="form-control" onChange={handleEmailChange} type="text"/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-success my-2">Изменить почту</button>
                    </div>
                </form>
                
                <form onSubmit={handleSubmit}>
               
                    <div className="form-group">
                        <label>Имя пользователя</label>
                        <input value={usersname} className="form-control" onChange={handleUsernameChange}/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-secondary my-2">Изменить</button>
                    </div>
                </form>
               
                <form onSubmit={handlePassSubmit}>
                    <div className="form-group">
                        <label>Старый пароль</label>
                        <input value={password} placeholder="Пароль..." className="form-control" onChange={handlePasswordChange} type="password"/>
                    </div>
                    <div className="form-group">
                        <label>Новый пароль</label>
                        <input value={newPassword} placeholder="Новый пароль..." className="form-control" onChange={handleNewPassChange} type="password"/>
                    </div>
                    <div className="form-group">
                        <button  className="btn btn-danger my-2">Изменить пароль</button>
                        
                    </div>
                    
                </form>
                <button className="btn btn-warning ml-2" onClick={()=>history.goBack()}>Назад</button>
              
            </div>
        
            <div className="col-4">
                <div className="row">
                    <div className="col-6"> <h3>Курс(ы) пользователя</h3></div>
                </div>
               
                {
                    courses.length>0 ?
                    <ul class="list-group">
               {courses.map((course)=>{
                    return <li class="list-group-item">
                        <Link to={"/course/"+course.id}>{course.name}</Link>
                        </li>
                    
                })}
                </ul>
                :
                <h5>Курсы не обнаружены</h5>
               
                }
                
            </div>
        </div>
       
        :
        <div class="text-center mt-5">
  <div class="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
    <span class="sr-only"></span>
  </div>
</div>
}
</>
    )
   

}
export default Profile;