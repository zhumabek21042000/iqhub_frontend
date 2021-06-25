import React,{useState} from 'react';
import {Accordion, Button, Card} from "react-bootstrap";
import CourseService from './../../services/spring-service';
import {Link, Redirect} from "react-router-dom";

const VideoPage=(props)=>{
    // const {id,createdDate, url, courseId} = this.props.video;
    const number = props.number;
    const video = props.video;
    const [videoDeleted, setVideoDeleted] = useState(false);
    async function deleteVideo() {
        CourseService.de(video.id);
        setVideoDeleted(true);
    }
    return(

        (
            videoDeleted ? <Redirect to={'/'} exact/>:(
                <Accordion className="col-11" style={{marginLeft: "auto", marginRight: "auto"}}>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                Видео {number + 1}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <iframe width="920" height="405"
                                        src={video.url} frameBorder="0"
                                        allowFullScreen></iframe>
                                <br/>
                                <button className={'btn btn-danger '} onClick={deleteVideo}>Delete</button>
                                <Link className={'btn btn-success ml-4'} to={`/editVideo/${video.id}`}>Edit</Link>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>))
    );
};
export default VideoPage;