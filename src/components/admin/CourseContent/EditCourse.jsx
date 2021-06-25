import React, {useState, useEffect} from 'react';

import CourseService from "../../../services/spring-service";
import { useHistory } from 'react-router-dom';


const EditCourse = ({id})=>{
    let history = useHistory();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState();
    const [createdDate, setCreatedDate] = useState();
    const[uid, setUid] = useState();
    
    useEffect(async()=>{
        await CourseService.getCourseById(id).then((response)=>{
            
            setName(response.data.name);
            setDescription(response.data.description);
            setUid(response.data.uid);  
            setCreatedDate(response.data.createdDate);

        });
    }, [id])

   
    const handleNameChange = event =>{
        setName(event.target.value)
    }
    const handleDescrChange = event =>{
        setDescription(event.target.value)
    }
    const handleSubmit = e =>{
        e.preventDefault();
        
       
        const newItem = {
            id,
            name,
            description,uid, createdDate
        }
        
        setLoading(true);
        CourseService.editCourse(newItem).then((response)=>{
            setLoading(false);
            alert("Курс успешно изменен")
            history.push("/adminpanel/courses");
        }).catch(error => {
            alert("Упс. Что-то пошло не так :(")
            setLoading(false);
        });
        
    }

    return(
        <>
        {!loading ? 
        <div className = "row">
                <div className = "col-6 offset-3 mt-5">
            <h3>Изменить курс</h3>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Название курса:</label>
                
                <input placeholder="Название какое-то ..."  type="text" className="form-control"
                    onChange={handleNameChange} value={name}/>
            </div>
               
            <div className="form-group">
                    <label>Описание курса:</label>
                <input placeholder="Этот курс о том и об этом ..."  type="text" className="form-control"
                        onChange={handleDescrChange} value={description}/>
            </div>        
            <div className = "form-group">
                <button className = "btn btn-success mt-2" >Изменить</button>
                &nbsp;
                <button className = "btn btn-warning mt-2" onClick={()=>history.goBack()}>Назад</button>
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
export default EditCourse;