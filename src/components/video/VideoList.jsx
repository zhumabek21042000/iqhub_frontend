import React, {useContext, useEffect, useState} from 'react';
import CourseService from './../../services/spring-service';
import VideoDetails from './VideoDetails';
import {Accordion, Card} from 'react-bootstrap';
const VideoList = (props) =>{
    // const [user, setUser] = useState({});
    const [videos, setVideos] = useState([]);

    useEffect(async()=>{
        await CourseService.getVideosOfCourse(props.id).then((response)=>{
            // setUser(response.data);
            setVideos(response.data);
        }) 
    }, []);
    return(
        <div className="col-6 offset-3">
            <Accordion>
        {videos.map(video=>(
            <VideoDetails id={video.id}></VideoDetails>
        ))}
        </Accordion>
       
    </div>)
}
export default VideoList;