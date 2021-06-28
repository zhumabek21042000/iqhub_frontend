import {Accordion, Card} from 'react-bootstrap';
import React, {useContext, useEffect, useState} from 'react';
import CourseService from './../../services/spring-service';
import { useHistory, withRouter, Redirect } from 'react-router-dom';
const VideoDetails = (props)=>{
    let history = useHistory();
    const [video, setVideo] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    useEffect(async()=>{
      setLoading(true);
      
        await CourseService.getVideoById(props.id).then((response)=>{
            // setUser(response.data);
            setVideo(response.data);
            setLoading(false);
            
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
    async function deleteVideo(){
      setLoading(true);
        CourseService.deleteVideo(props.id).then((response)=>{
          setIsDeleted(true);
          setLoading(false);
          alert("Видео было успешно удалено!");
        })
    }
    return(
      <div>
      {!loading ? 

      <div>
      {!isDeleted ?
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey="0">
  
        <h5>Описание видео: {video.description}</h5>
      
      </Accordion.Toggle>
      {/* <Accordion.Collapse eventKey="1"> */}
        <Card.Body className="text-center">
        <iframe width={window.innerWidth/2} height={window.innerHeight/2} src={video.url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        
        </Card.Body>
      {/* </Accordion.Collapse> */}
      <div className="row">
      <button className="btn btn-secondary ml-5" style={{width:"100px", height:"40px", marginLeft:"5px"}} onClick={()=>history.goBack()}>Назад</button>
      {isAdmin && <>
      <button className="btn btn-danger ml-5" onClick={e =>
        window.confirm("Вы уверены что хотите удалить это видео?") &&
        deleteVideo()
    } style={{width:"100px", height:"40px", marginLeft:"5px"}}>Удалить</button>
      <button className="btn btn-success ml-5" style={{width:"100px", height:"40px", marginLeft:"5px"}} onClick={()=>history.push("/adminactions/editvideo/"+video.id)}>Изменить</button>
      </>}
      
      </div>
    </Card>
   

    :
    <Redirect to={"/adminpanel/videos"} exact/>
      }
      </div>
      :
    CourseService.loadingGif()
    }
      </div>
    )
}
export default withRouter(VideoDetails);