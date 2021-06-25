import React,{useState,useEffect} from 'react';
import { Link, Route, Switch, useRouteMatch, useHistory} from 'react-router-dom';
import Sidebar from './ContentList';
import CourseTable from "./CourseContent/CourseTable";
import VideoTable from "./VideoContent/VideoTable";
import UsersTable from "./UsersContent/UsersTable";
import AssignmentTable from './AssignmentContent/AssignmentTable';


const AdminPage = () =>{
    return (

        <div className="row mt-3">
            <div className="col-3">
                <Sidebar/>
            </div>
            <div className="col-9">
                <Switch>
                    <Route path="/adminpanel/courses">
                        <CourseTable/>
                    </Route>
                    <Route path="/adminpanel/videos">
                        <VideoTable/>
                    </Route>
                    <Route path="/adminpanel/users">
                        <UsersTable/>
                    </Route>
                    <Route path="/adminpanel/assignments">
                        <AssignmentTable/>
                    </Route>
                </Switch>

            </div>
        </div>

    )
}

export default AdminPage;