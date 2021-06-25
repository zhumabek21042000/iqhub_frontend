import React,{useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import CourseService from "../../../services/spring-service";

const CourseData = ({courselist, loading}) => {
    
    const [courses, setCourses] = useState([]);

    let history = useHistory();

    useEffect(() => {
       setCourses(courselist);
    
    },[courselist]);
    if(loading){
        return <h2>Loading...</h2>
    }
    return(
        
            
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Название</th>
                        <th scope="col">Описание</th>
                        <th scope="col">Дата создания</th>
                        <th scope="col">UID</th>
                    </tr>
                    </thead>
                    <tbody>
                    {courses.length>0 ?
                    courses.map((course) => {
                        return (
                            <tr>
                                <th scope="row">{course.id}</th>
                                <td>{course.name}</td>
                                <td>{course.description}</td>
                                <td>{CourseService.timeConverter(course.createdDate)}</td>
                                
                                
                                <td>{course.uid}</td>
                                
                                <td><Link to={`/course/${course.id}`}>Details</Link></td>
                            </tr>
                        )
                    } )
                :
                <h3>Ничего не найдено :(</h3>
                }
                    </tbody>
                </table>
            </div>
       
    )
}

export default CourseData;