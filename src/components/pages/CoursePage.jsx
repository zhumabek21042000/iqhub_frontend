import React, {useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import CourseService from '../../services/spring-service'
const CoursePage = ({coursedata}) => {
    const [course, setCourse] = useState();
    useEffect(async()=>{
        alert(coursedata.id)
        setCourse(coursedata);
    })
    return (
        <div className="card" style={{width: "18rem"}}>
        <div className="card-body">
          <h5 className="card-title">{course.name}</h5>
          <p className="card-text">{course.description}</p>
          <Link to={"/course/"+course.id} class="card-link">Перейти</Link>
        </div>
      </div>
    )
}

export default CoursePage
