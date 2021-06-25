import React, {useState} from 'react';
import './add-course.css';
import CourseService from "../../../services/spring-service";
import { useHistory } from 'react-router-dom';


const AddCourse = ()=>{
    let history = useHistory();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [uid, setUid] = useState();
    

    const onSubmit = (e) =>{
        e.preventDefault();
      
       
        const newItem = {
            name,
            description, uid,

        }
        CourseService.addNewCourse(newItem).then((response)=>{
            setName('');
            setDescription('');
            setUid();
            alert("Курс успешно добавлен")
            history.push("/adminpanel/courses");
            // window.location.reload();
        })
        
        
    }

    return(
        <div className = "row">
                <div className = "col-6 offset-3 mt-5">
            <h3>Добавить новый курс</h3>
            <form onSubmit={(e)=>onSubmit(e)}>
            <div className="form-group">
                <label>Наименование курса:</label>
                
                <input placeholder="Чето там чето ..."  type="text" className="form-control"
                    onChange={(e)=>{
                        setName(e.target.value)}} value={name}/>
                    </div>
               
                <div className="form-group">
                     <label>Описание курса:</label>
                    <input placeholder="Этот курс такой-то такой ..."  type="text" className="form-control"
                           onChange={(e)=>{
                               setDescription(e.target.value)}} value={description}/>
                </div>
              
                
                <div className="from-group">
                    <label>Уникальный ID курса:</label>
                    <input placeholder="ID для курса"  type="text" className="form-control"
                           onChange={(e)=>{
                               setUid(e.target.value)}} value={uid}/>
                </div>
                <div className = "form-group">
                            <button className = "btn btn-success mt-2" >Добавить</button>
                            &nbsp;
                            <button className = "btn btn-warning mt-2" onClick={()=>history.push("/adminpanel/courses")}>Назад</button>
                        </div>      
            </form>
        </div>
        </div>
    );
};
export default AddCourse;