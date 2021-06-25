import React,{useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { differenceBy } from 'lodash';
import CourseService from "../../../services/spring-service";

const UserCourseData = ({courselist, loading,id}) => {
    
    const [courses, setCourses] = useState([]);
    const [user, setUser] = useState();
    let history = useHistory();

    useEffect(() => {
        setCourses(courselist)
        CourseService.getUserById(id).then((response)=>{
            
            
            setUser(response.data);
        })
       
    },[courselist]);
     function enroll(c_id, user_id){
        //  alert("COurse id"+c_id+", User id"+user_id)
         CourseService.enrollCourse(c_id,user_id).then((response)=>{
            alert("Успешно добавлено")
            history.goBack();
            // window.location.reload();
        }).catch(error=>{
            alert("Произошла ошибка!")
        })
    }
    if(loading){
        return CourseService.loadingGif();
    }
    return(
        
            
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Дата создания</th>
                        <th scope="col">Описание</th>
                        <th scope="col">Название</th>
                        <th scope="col">UID</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                    courses.length>0?
                    courses.map((course) => {
                        return (
                            <tr>
                                <th scope="row">{course.id}</th>
                                <td>{CourseService.timeConverter(course.createdDate)}</td>
                                <td>{course.description}</td>
                                <td>{course.name}</td>
                                <td>{course.uid}</td>
                                
                                {/* <td><Link to={`/course/${course.id}`}>Details</Link></td> */}
                                <td><button onClick={()=>enroll(course.id, id)} className="btn btn-primary">Добавить</button></td>
                            </tr>
                        )
                    } )
                :
                <h3>Ничего не найдено :(</h3>}
                    <button className="btn btn-secondary" onClick={()=>history.goBack()}>Назад</button>
                    </tbody>
                </table>
            </div>
       
    )
}

export default UserCourseData;