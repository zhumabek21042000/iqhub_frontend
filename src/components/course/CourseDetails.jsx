import moment from 'moment';
import { Accordion, Card, Button } from 'react-bootstrap';
import React, {useContext, useEffect, useState} from 'react';
import { Link, Redirect, useHistory} from 'react-router-dom';
import UploadFilesService from '../admin/AssignmentContent/UploadFilesService';
import CourseService from '../../services/spring-service';
const CourseDetails = (props) =>{
    let history = useHistory();
    // const [user, setUser] = useState({});
    const [course, setCourse] = useState({});
    const [date1, setDate1] = useState("NaN");
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [access, setAccess] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [videos, setVideos] = useState([]);
  // setAccess(true)
    useEffect(async()=>{
      
      setLoading(true);
      await CourseService.checkCourse(props.id).then((response)=>{
        setAccess(response.data);
      })
      await CourseService.getCurrentUser().then((response)=>{
        const user = response.data;
        let userRoles = user.roles;
           for(let i = 0; i < userRoles.length;i++){
               if(userRoles[i]['role'] === "ROLE_ADMIN"){
                //  alert(true)
                   setIsAdmin(true);
                    setAccess(true);
               }
           }
          //  alert(132424)
           if(!localStorage.getItem("token")){
               setIsAdmin(false);
           }
       }).catch((error)=>{
         if(localStorage.getItem("token"))
         localStorage.removeItem("token");
       });
        await CourseService.getCourseById(props.id).then((response)=>{
            // setUser(response.data);
            setCourse(response.data);
            const date = CourseService.timeConverter(response.data.createdDate);
            setDate1(date);
        });

        await CourseService.getVideosOfCourse(props.id).then((response)=>{
            setVideos(response.data);
        })
        
        await UploadFilesService.getFilesOfCourse(props.id).then((response)=>{
          var filtered = response.data.filter(function(el){
            return el !=null;
          })
          setTasks(filtered);
        })
       
        
        // await checkAdmin();
        // setAccess
        setLoading(false);
    }, []);
    async function checkAdmin(){
      // CourseService.getCurrentUser().then((response)=>{
      //   const user = response.data;
      //      let userRoles = user.roles;
      //      for(let i = 0; i < userRoles.length;i++){
      //          if(userRoles[i]['role'] === "ROLE_ADMIN"){
      //            alert(true)
      //              setIsAdmin(true);
      //               setAccess(true);
      //          }
      //      }
      //      if(!localStorage.getItem("token")){
      //          setIsAdmin(false);
      //      }
      //  }).catch((error)=>{
      //    if(localStorage.getItem("token"))
      //    localStorage.removeItem("token");
      //  })
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
      {
      
      
      !loading ? 

      access ?
      <div>
      {
      !isDeleted ?
    <div class="jumbotron">
    <h2 className="display-6">{course.name}</h2>
    <p class="lead">Описание: {course.description}</p>
    <hr class="my-4"/>
    <p>Дата создания: {date1}</p>
    <div className="row">
    <button className="btn btn-secondary ml-5" style={{width:"100px", height:"40px", marginLeft:"5px"}} onClick={()=>history.goBack()}>Назад</button>
      {isAdmin && <>
      <button className="btn btn-danger ml-5" onClick={e =>
        window.confirm("Вы уверены что хотите удалить это видео?") &&
        deleteCourse()
    } style={{width:"100px", height:"40px", marginLeft:"5px"}}>Удалить</button>
      <button className="btn btn-success ml-5" style={{width:"100px", height:"40px", marginLeft:"5px"}} onClick={()=>history.push("/adminactions/editcourse/"+course.id)}>Изменить</button>
      </>}
      
      </div>
      <div className="row mt-4" >
          <div className="col-6" style={{border:"10px solid transparent"}}>
            <h3>Видео уроки</h3>
            <Accordion >
            {!loading?
              videos.length>0 ?
            videos.map((video, index)=>{
                return(
                <Card className="py-2">
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Видео {index+1}
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>

                  <iframe width={window.innerWidth/3} height={window.innerHeight/2} src={video.url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                      <hr class="my-4"/>
                      <p>Описание: {video.description}</p>
                      <Link to={`/video/${video.id}`} class="btn btn-primary" role="button">Открыть видео в отдельной странице</Link>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>)
            })
            :
            <h3>К сожалению, в данном курсе нет видео</h3>

            :CourseService.loadingGif()
            }
          </Accordion>
          </div>
          <div className="col-6" style={{border:"10px solid transparent"}}>
          <ul class="list-group">
          <h3>Задачи/Документы/Лекции</h3>
          {
          !loading?
          tasks.length >0  ?
          tasks.map((task, index)=>{
            return(
            <li className="list-group-item"><a href={task.url}>{task.name}</a></li>)})
            :
            <h5>К сожалению, в данном курсе нет документов</h5>

            :CourseService.loadingGif()
            }
          
          </ul>
          </div>
      </div>
  </div>
  :
  <Redirect to={"/adminpanel/courses"} exact/>
    }
    </div>
    
  
  
  :
    history.push("/")
  :
  CourseService.loadingGif()
  }
  </div>
  )
}
export default CourseDetails;