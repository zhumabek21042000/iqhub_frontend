import logo from './logo.svg';
import './App.css';
import NavBar from './components/layout/NavBar';
import VideoTutorial from './components/shared/videoMenu';
import 'bootstrap/dist/css/bootstrap.min.css'
import CourseService from './services/spring-service';
import CourseList from './components/course/CourseList';
import CourseDetails from './components/course/CourseDetails'
import React, {useState, useEffect} from 'react'

function App() {
  return (
    <div className="App">
      {/* <NavBar></NavBar> */}
      <div className="container">
        <div className="row">
          <div className="col-6">
          <VideoTutorial></VideoTutorial>
          {console.log(123123)}
          
          </div>
          <div className="col-6">
          <VideoTutorial></VideoTutorial>
          </div>
        </div>
{/* <CourseList></CourseList> */}
      </div>
    </div>
  );
}

export default App;
