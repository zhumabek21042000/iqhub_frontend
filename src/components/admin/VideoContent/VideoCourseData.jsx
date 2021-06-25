import React,{useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import CourseService from "../../../services/spring-service";

const VideoCourseData = ({courselist, loading}) => {
    
    const [courses, setCourses] = useState([]);
    let history = useHistory();

    useEffect(() => {
       setCourses(courselist);
    },[courselist]);
    if(loading){
        return CourseService.loadingGif()
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
                        
                    {courses.length>0?
                    courses.map((course) => {
                        return (
                            <tr>
                                <th scope="row">{course.id}</th>
                                <td>{CourseService.timeConverter(course.createdDate)}</td>
                                <td>{course.description}</td>
                                <td>{course.name}</td>
                                <td>{course.uid}</td>
                                
                                {/* <td><Link to={`/course/${course.id}`}>Details</Link></td> */}
                                <td><button onClick={()=>history.push({pathname:"/adminactions/addvideo", state:{id:course.id}})} className="btn btn-primary">Выбрать</button></td>
                            </tr>
                        )
                    } )
                :<h1>Ничего не найдено :(</h1>}
                    <button className="btn btn-secondary" onClick={()=>history.goBack()}>Назад</button>
                    </tbody>
                </table>
            </div>
       
    )
}

export default VideoCourseData;