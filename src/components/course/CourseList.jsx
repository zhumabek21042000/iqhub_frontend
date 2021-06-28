import React, {useContext, useEffect, useState} from 'react';
import CourseService from '../../services/spring-service';
import CourseDetails from './CourseDetails';
import CoursePage from '../pages/CoursePage';
import { Link } from 'react-router-dom';
const CourseList = (props) =>{
    // const [user, setUser] = useState({});
    const [courses, setCourses] = useState([]);

    useEffect(async()=>{
         await CourseService.getCurrentUser().then((response)=>{
            // setUser(response.data);
            setCourses(response.data.enrolledCourses);
            console.log("data is"+response.data)
        })
        
    }, []);
    return(<div className="row">
       <h2 className="mt-2">Курсы {props.email}</h2>
        <div className="col-3">
        {
          courses.length>0 ?
        courses.map(course=>{
            return (<div className="card" style={{width: "18rem;"}}>
            <div className="card-body">
              <h5 className="card-title">{course.name}</h5>
              <p className="card-text">{course.description}</p>
              <Link to={"/course/"+course.id} class="card-link">Перейти</Link>
            </div>
          </div>
            )
            // return(<h1>{course.name}</h1>)
})
:
<h5>На данный момент нет курсов</h5>
}
        
        </div>
    </div>)
}
export default CourseList;