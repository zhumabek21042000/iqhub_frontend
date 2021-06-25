import React,{useState, useEffect} from 'react';
import {Link, useHistory, withRouter} from 'react-router-dom';
import CourseService from "../../../services/spring-service";
import DocCourseData from './DocCourseData';
import Pagination from '../Pagination';

const AddDoc = () => {
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [coursesPerPage] = useState(5);
    const [search, setSearch] = useState('');
    let history = useHistory();

    useEffect(() => {
        setLoading(true);
        CourseService.getAllCourses()
            .then(res=>{
                setCourses(res.data);
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
        <div className="container">
            <div >
                <h2 style={{flexGrow:"0.05"}}>Курсы</h2>
                {/* <button type='button' className="btn btn-primary w-25" onClick={() => history.push('/adminactions/addcourse') }>
                    Добавить
                </button> */}
                <h4>Выберите курс чтобы туда добавить документ</h4>
            </div>
            <form className="mt-3">
                <input class="form-control w-25" type="text" onChange={handleSearchChange} placeholder="Поиск..." aria-label="Search"/>
            </form>
            {courses.length>0 ?
            <>
            <DocCourseData courselist={currentCourses} loading={loading}></DocCourseData>
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

export default  withRouter(AddDoc);