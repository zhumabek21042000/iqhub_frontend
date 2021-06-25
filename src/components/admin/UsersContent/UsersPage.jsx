import React, {useState, useEffect} from "react";
import CourseService from "../../../services/spring-service";
// import {BsFillTrashFill} from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import {RiAddCircleLine} from 'react-icons/ri';
import { useHistory, Link } from "react-router-dom";
const UsersPage = ({id}) =>{
    const [user, setUser] = useState({});
    const [userRoles, setUserRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [role1, setRole1] = useState("");
    const [usersname, setUsersname] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [notUserRoles, setNotUserRoles] = useState([]);
    const [email, setEmail] = useState("");
    const [courses, setCourses] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    
    let history = useHistory();
    
    
    useEffect(async()=>{
        setLoading(true);
        await CourseService.getUserById(id).then((response)=>{
                setUser(response.data);
                setUserRoles(response.data.roles);
                // setNotUserRoles(CourseService.getRolesNotInUser(response.data.roles, CourseService.getAllRoles().
                // then((response)=>{
                //     return response.data;
                // })))
                setUsersname(response.data.usersname);
                setCourses(response.data.enrolledCourses);
                setEmail(response.data.email);
                setLoading(false);
            
        })
        await CourseService.getRolesNotInUser(id).then((response)=>{
            setNotUserRoles(response.data);
        })
        // await CourseService.getAllCourses().then((response)=>{
        //     setAllCourses(response.data);
        // })
    }, []);

    const handleRole = (event) =>{

        setRole1(event.target.value);
    }

     function unenroll(c_id, user_id){
        CourseService.unenrollCourse(c_id,user_id).then((response)=>{
            // setCourses(courses.splice(courses.indexOf(CourseService.getCourseById(c_id))));
            alert("Успешно удалено")
            window.location.reload();
            // history.push("/adminactions/userpage/"+id)
        }).catch(error=>{
            alert("Произошла ошибка!")
        })
    }

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
        CourseService.changeEmail(email)
            .then(async res=>{
                setLoading(false);
                alert("Почта пользователя успешно изменено!")
                // window.location.reload();
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
                // window.location.reload();
                
            
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

    const reassignRoleSubmit = event =>{
        setLoading(true);
        event.preventDefault();
        // alert(role1+user.id)
        if(role1 === ""){
            alert("Роль не выбрана");
            setLoading(false);
                
        }
        else{
        CourseService.reassignrole(user.id, role1)
            .then(async res=>{
                setLoading(false);
                setPassword("");
                setNewPassword("");
                setRole1("");
                alert("Роль удалена!");
                window.location.reload();

            
            }).catch(error => {
                alert("Упс. Что-то пошло не так :(");
                setLoading(false);
                setRole1("");
            });
        }

    }
    const assignRoleSubmit = event =>{
        setLoading(true);
        event.preventDefault();
        // alert(role1+user.id)
        if(role1 === ""){
            alert("Роль не выбрана");
            setLoading(false);
                
        }
        else{
        CourseService.assignrole(user.id, role1)
            .then(async res=>{
                setLoading(false);
                setPassword("");
                setNewPassword("");
                setRole1("");
                alert("Роль добавлена!");
                window.location.reload();

            
            }).catch(error => {
                alert("Упс. Что-то пошло не так :(");
                setLoading(false);
                setRole1("");
            });
        }

    }
    

    return(
        <>
        {!loading ? 
       
        <div className="row mt-3">
            <div className="col-4">
                 <form onSubmit={emailSubmit}>
                <div className="form-group">
                        <label>Почта</label>
                        <input value={email} className="form-control" onChange={handleEmailChange} type="text"/>
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
              
            </div>
            <div className="col-4">
                Роли пользователя
                {userRoles.length>0 ? 
                <form onSubmit={reassignRoleSubmit}>
                {userRoles.map((role)=>
                {
                    return <button onClick={handleRole} value={role.role} className="btn btn-danger mx-2" >{role.role} <BsTrash/> </button>
                    
                })}
                </form>
                :
                <h4>Роли у пользователя не обнаружены</h4>
                    }   
                Другие роли
                {notUserRoles.length>0 ? 
                <form onSubmit={assignRoleSubmit}>
                {notUserRoles.map((nrole)=>
                {
                    return <button onClick={handleRole} value={nrole.role} className="btn btn-success mx-2" >{nrole.role} <RiAddCircleLine/> </button>
                    
                })}
                </form>
                :
                <h4>Остальные роли не обнаружены</h4>
            }   
            </div>
            <div className="col-4">
                <div className="row">
                    <div className="col-6"> <h3>Курс(ы) пользователя</h3></div>
                    <div className="col-6"><button className="btn btn-success ml-2"  onClick={() => 
                    history.push({ pathname:'/adminactions/addcourseuser', state:{usercourses:courses, id:id}}) }>Добавить курс</button></div>
                    
                
                </div>
               
                {
                    courses.length>0 ?
                    <ul class="list-group">
               {courses.map((course)=>{
                    return <li class="list-group-item">
                        <Link to={"/course/"+course.id}>{course.name}</Link>
                        <button className="btn btn-danger" onClick={()=>unenroll(course.id, id)} style={{marginLeft:"5px",float:"right"}}>Удалить</button>
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
export default UsersPage;