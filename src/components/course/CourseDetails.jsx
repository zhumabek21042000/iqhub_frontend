import moment from 'moment';
import React, {useContext, useEffect, useState} from 'react';
import { Redirect, useHistory} from 'react-router-dom';
import CourseService from '../../services/spring-service';
const CourseDetails = (props) =>{
    let history = useHistory();
    // const [user, setUser] = useState({});
    const [course, setCourse] = useState({});
    const [date1, setDate1] = useState("NaN");
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [videos, setVideos] = useState([]);

    useEffect(async()=>{
        await CourseService.getCourseById(props.id).then((response)=>{
            // setUser(response.data);
            setCourse(response.data);
            const date = CourseService.timeConverter(response.data.createdDate);
            setDate1(date);
        });

        await CourseService.getAllVideos().then((response)=>{
          if(response.data.course === course){
            setVideos(response.data);
          }
        })
        
        await checkAdmin();
        
    }, []);
    async function checkAdmin(){
      CourseService.getCurrentUser().then((response)=>{
        const user = response.data;
           let userRoles = user.roles;
           for(let i = 0; i < userRoles.length;i++){
               if(userRoles[i]['role'] === "ROLE_ADMIN"){
                   setIsAdmin(true);
               }
           }
           if(!localStorage.getItem("token")){
               setIsAdmin(false);
           }
       }).catch((error)=>{
         if(localStorage.getItem("token"))
         localStorage.removeItem("token");
       })
    }
    async function deleteCourse(){
        setLoading(true);
          CourseService.deleteCourse(props.id).then((response)=>{
            setIsDeleted(true);
            setLoading(false);
            alert("Курс был успешно удален!");
          })
      }
    async function changeDate(){
        const time = new Date(course.createdDate);
        setDate1(time);
        
    }
    return(
    
    <div>
      {!loading ? 

      <div>
      {!isDeleted ?
    <div class="jumbotron">
    <h2 className="display-6">{course.name}</h2>
    <p class="lead">Описание: {course.description}</p>
    <hr class="my-4"/>
    <p>Дата создания: {date1}</p>
    <div className="row">
      {isAdmin && <>
      <button className="btn btn-danger ml-5" onClick={e =>
        window.confirm("Вы уверены что хотите удалить это видео?") &&
        deleteCourse()
    } style={{width:"100px", height:"40px", marginLeft:"5px"}}>Удалить</button>
      <button className="btn btn-success ml-5" style={{width:"100px", height:"40px", marginLeft:"5px"}} onClick={()=>history.push("/adminactions/editcourse/"+course.id)}>Изменить</button>
      </>}
      <button className="btn btn-secondary ml-5" style={{width:"100px", height:"40px", marginLeft:"5px"}} onClick={()=>history.goBack()}>Назад</button>
      </div>
      <div className="row mt-4">
          <div className="col-6">
            <h3>Видео уроки</h3>
            <div className="accordion" id="accordionExample">
            {videos.map((video, index)=>{
                
            })}
            </div>
          </div>
          <div className="col-6">
          <h3>Задачи/Документы/Лекции</h3>
          </div>
      </div>
  </div>
  :
  <Redirect to={"/adminpanel/courses"} exact/>
    }
    </div>
    :
  CourseService.loadingGif()
  }
  </div>
  )
}
export default CourseDetails;