import React,{useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import CourseService from "../../../services/spring-service";

const VideoData = ({videolist}) => {
    const [videos, setVideos] = useState([]);
    let history = useHistory();
    
    useEffect(() => {
       setVideos(videolist);
    },[videolist]);

    return(
        
            
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Дата создания</th>
                        <th scope="col">Ссылка</th>
                        <th scope="col">ID курса</th>
                        <th scope="col">Название курса</th>

                    </tr>
                    </thead>
                    <tbody>
                        {videos.length>0 ? 
                    videos.map((video) => {
                        console.log(video)
                        return (
                            <tr>
                                <th scope="row">{video.id}</th>
                                <td>{CourseService.timeConverter(video.createdDate)}</td>
                                <td>{video.url}</td>
                                <td>{video.course.id}</td>
                                <td>{video.course.name}</td>
                                <td><Link to={`/video/${video.id}`}>Details</Link></td>
                                {/* <td><Link to={{pathname:`/video/${video.id}`, state:{id:video.id, status:true}}}>Details</Link></td> */}
                                {/* <td><button className="btn btn-primary" onClick={()=>history.push({pathname:"/video/"+video.id, state:{id:video.id, status:true}})}>Details</button></td> */}
                            </tr>
                        )
                    } )
:<h3>Ничего не найдено :(</h3>}

                    </tbody>
                </table>
            </div>
       
    )
}

export default VideoData;