import React,{useState, useEffect} from 'react';
import {Link, useHistory, withRouter} from 'react-router-dom';
import CourseService from "../../../services/spring-service";
import UserCourseData from './UserCourseData';
import { differenceBy } from 'lodash';
import Pagination from '../Pagination';

const AddUserCourse = ({location}) => {
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [coursesPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [usercourses, setUserCourses] = useState(location.state.usercourses)
    let history = useHistory();

    useEffect(() => {
        console.log(location.state.usercourses+"DDDDDDDDDDDDdd")
        setLoading(true);
        
        CourseService.getAllCourses()
            .then(res=>{
                setCourses(differenceBy(res.data, usercourses));
                setLoading(false);
            });
    },[]);
    const handleSearchChange = async(event)=>{
        setSearch(event.target.value)
        event.preventDefault();
    }
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstUser = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.filter(course=>course.name.toLowerCase().includes(search.toLowerCase()) || course.description.toLowerCase().includes(search.toLowerCase())).slice(indexOfFirstUser, indexOfLastCourse);
    const paginate = pageNumber => setCurrentPage(pageNumber);
    return(
        <div>
            <div className="row">
                <h2 style={{flexGrow:"0.05"}}>Курсы</h2>
                {/* <button type='button' className="btn btn-primary w-25" style={{marginLeft:"12px"}} onClick={() => history.push('/adminactions/addcourse') }>
                    Добавить
                </button> */}
            </div>
            <form className="mt-3">
                <input class="form-control w-25" type="text" onChange={handleSearchChange} placeholder="Поиск..." aria-label="Search"/>
            </form>
            {courses.length>0 ?
            <>
            <UserCourseData courselist={currentCourses.reverse()} id={location.state.id} loading={loading}></UserCourseData>
            <Pagination
                itemsPerPage={coursesPerPage}
                totalItems={courses.length}
                paginate={paginate}
            />
            </>
            :
            <h3 className="mt-3 text-center">Никаких курсов нет :(</h3>
}
        </div>
    )
}

export default  withRouter(AddUserCourse);