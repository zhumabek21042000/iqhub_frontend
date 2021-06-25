import React, {useState, useEffect} from 'react';
import CourseService from './../../services/spring-service';
import {useHistory} from 'react-router-dom';
import VideoTutorial from '../shared/videoMenu';
import CourseList from '../course/CourseList';

const HomePage= ()=>{
    let history = useHistory();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});
    const [isAuth, setIsAuth] = useState(true);
    useEffect(()=>{
        
         CourseService.getCurrentUser().then((response)=>{
                setUser(response.data);
                setLoading(false);
                // setIsAuth(true);
        })
        if(localStorage.getItem("token")){
            setIsAuth(true);
        } 
        else{
            setIsAuth(false);
            history.push("/login");
        }
    }, []);
    return(<>
    {loading? 
    <div class="text-center mt-5">
    <div class="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
      <span class="sr-only"></span>
    </div>
  </div>
 : <>
        {isAuth ? 
            (<>
            <div className="row mt-5">
                <div className="col-6">
                    <VideoTutorial></VideoTutorial>
                </div>
                <div className="col-6">
                <VideoTutorial></VideoTutorial>
                </div>
            </div>
            
            <CourseList email={user.email}></CourseList>
            </>)
        :history.push("/login")
    }
    </>
}
    </>);
}
export default HomePage;