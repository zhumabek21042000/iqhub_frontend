import React, {useContext} from 'react';

import {BrowserRouter as Router, Route, Switch, useHistory, withRouter} from 'react-router-dom';
import {useCookies} from 'react-cookie';
// import {CardsPage, CardDetailsPage, EditPage} from '../pages';
import CourseDetails from '../course/CourseDetails';
import Login from './../auth/Login';
import VideoDetails from '../video/VideoDetails';
import HomePage from './../pages/HomePage';
import { useState, useEffect } from 'react';
import CourseService from '../../services/spring-service';
import AdminPage from './../admin/AdminPage';
import AddUser from '../admin/UsersContent/AddUser';
import AddCourse from '../admin/CourseContent/AddCourse';
import AddVideo from '../admin/VideoContent/AddVideo';
import UsersPage from '../admin/UsersContent/UsersPage';
import AddVideoForm from '../admin/VideoContent/AddVideoForm';
import EditVideo from '../admin/VideoContent/EditVideo';
import EditCourse from '../admin/CourseContent/EditCourse';
import AddDoc from '../admin/AssignmentContent/AddAssignment';
import Apps from '../admin/AssignmentContent/app';
import UploadFiles from '../admin/AssignmentContent/UploadFiles';
import AddUserCourse from '../admin/UsersContent/AddUserCourse';


const Main = () => {
    const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);

    let history = useHistory();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
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
        })
    }, [])
    return (
        <Switch>
            <>
            {isAdmin && 
            
         <>
            <Route path="/adminpanel">
                <AdminPage></AdminPage>
                </Route>
            <Route path="/adminactions/adduser" component={AddUser}/>
            <Route path="/adminactions/addcourse" component={AddCourse}/>
            <Route path="/adminactions/adddocument" component={UploadFiles}/>
            <Route path="/adminactions/coursevideotable" component={AddVideo}/>
            <Route path="/adminactions/coursedoctable" component={AddDoc}/>
            <Route path="/adminactions/addvideo" component={AddVideoForm}/>
            <Route path="/adminactions/addcourseuser" component={AddUserCourse}/>
            <Route path="/adminactions/userpage/:id"
                   render={({match}) => {
                       const {id} = match.params;
                       return <UsersPage id={id}/>
                   }}/>
            <Route path="/test/upload" component={Apps}/>
            <Route exact path="/adminactions/editvideo/:id"
                   render={({match}) => {
                       const {id} = match.params;
                       return <EditVideo id={id}/>
                   }}/>
            <Route exact path="/adminactions/editcourse/:id"
            render={({match}) => {
                const {id} = match.params;
                return <EditCourse id={id}/>
            }}/>
            
            </>
            }
            <Route exact path = "/login" >
                <Login/>
            </Route>
        
            <Route exact path={'/'} component={HomePage}/>
            <Route exact path="/course/:id"
                   render={({match}) => {
                       const {id} = match.params;
                       return <CourseDetails id={id}/>
                   }}
            />
            <Route exact path="/video/:id"
                   render={({match}) => {
                       const {id} = match.params;
                       return <VideoDetails id={id}/>
                   }}/>
            </>
        </Switch>
    );
};
export default withRouter(Main);