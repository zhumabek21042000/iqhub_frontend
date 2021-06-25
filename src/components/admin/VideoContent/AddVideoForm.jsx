import React, {useState} from 'react';

import CourseService from "../../../services/spring-service";
import { useHistory } from 'react-router-dom';


const AddVideoForm = ({location})=>{
    let history = useHistory();
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    

    const onSubmit = (e) =>{
        e.preventDefault();
      
       
        const newItem = {
            url,
            description
        }
        
        setLoading(true);
        CourseService.addNewVideo(location.state.id, newItem).then((response)=>{
        
            setDescription('');
            setUrl('');
            setLoading(false);
            alert("Видео успешно добавлено")
            history.push("/adminpanel/videos");
            // window.location.reload();
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
            <h3>Добавить новый курс</h3>
            <form onSubmit={(e)=>onSubmit(e)}>
            <div className="form-group">
                <label>Ссылка на видео:</label>
                
                <input placeholder="URL ..."  type="text" className="form-control"
                    onChange={(e)=>{
                        setUrl(e.target.value)}} value={url}/>
                    </div>
               
                <div className="form-group">
                     <label>Описание видео:</label>
                    <input placeholder="Этот видео о том и об этом ..."  type="text" className="form-control"
                           onChange={(e)=>{
                               setDescription(e.target.value)}} value={description}/>
                </div>
              
                
                
                <div className = "form-group">
                            <button className = "btn btn-success mt-2" >Добавить</button>
                            &nbsp;
                            <button className = "btn btn-warning mt-2" onClick={()=>history.push("/adminactions/coursevideotable")}>Назад</button>
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
export default AddVideoForm;