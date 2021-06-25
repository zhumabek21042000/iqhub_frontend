import React, {useState, useEffect} from 'react';

import CourseService from "../../../services/spring-service";
import { useHistory } from 'react-router-dom';


const EditVideo = ({id})=>{
    let history = useHistory();
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState();
    const [createdDate, setCreatedDate] = useState();
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState();
    const [courseName, setCourseName] = useState();
    
    useEffect(async()=>{
        await CourseService.getVideoById(id).then((response)=>{
        
            setUrl(response.data.url);
            setDescription(response.data.description);
            setCourse(response.data.course);  
            setCreatedDate(response.data.createdDate)
            setCourseName(response.data.course.name);
            
        });
        await CourseService.getAllCourses().then((response)=>{
            setCourses(response.data);
        })
        // await CourseService.getCourseById(selectedCourseId).then((response)=>{
        //     setSelectedCourse(response)
        // })
    
    }, [id])

   
    const handleUrlChange = event =>{
        setUrl(event.target.value)
    }
    const handleDescrChange = event =>{
        setDescription(event.target.value)
    }
    const handleSubmit = e =>{
        e.preventDefault();
        
       
        const newItem = {
            id,
            url,
            description,course:selectedCourse, createdDate
        }
        
        setLoading(true);
        CourseService.editVideo(newItem).then((response)=>{
            setLoading(false);
            alert("Видео успешно изменено")
            history.push("/adminpanel/videos");
        }).catch(error => {
            
            alert("Упс. Что-то пошло не так :(")
            setLoading(false);
        });
        
    }
    const handleCourseChange = (event)=> {
        setSelectedCourse(courses[event.target.value]);
      }

    return(
        <>
        {!loading ? 
        <div className = "row">
                <div className = "col-6 offset-3 mt-5">
            <h3>Изменить видео</h3>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Ссылка на видео:</label>
                
                <input placeholder="URL ..."  type="text" className="form-control"
                    onChange={handleUrlChange} value={url}/>
            </div>
               
            <div className="form-group">
                    <label>Описание видео:</label>
                <input placeholder="Этот видео о том и об этом ..."  type="text" className="form-control"
                        onChange={handleDescrChange} value={description}/>
            </div>
            <div className="form-group">
                    <label>Видео для курса: </label>
                <input disabled={true} type="text" className="form-control"
                       value={courseName}/>
            </div>
            <div className="form-group">
                    <label>Можете выбрать другой курс:</label>
                    <select className="form-control" id="fruit"  onChange={handleCourseChange}>
            { courses.map((option, index) => <option key={index} value={index}>{option.name}</option>)}
          </select>
            </div>
              
                
                
            <div className = "form-group">
                <button className = "btn btn-success mt-2" >Изменить</button>
                &nbsp;
                <button className = "btn btn-warning mt-2" onClick={()=>history.push("/adminpanel/videos")}>Назад</button>
            </div>      
            </form>
        </div>
        </div>
:<div class="text-center mt-5">
<div class="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
  <span class="sr-only"></span>
</div>
</div>}
        </>
    );
};
export default EditVideo;