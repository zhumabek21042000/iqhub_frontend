import React,{useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import CourseService from "../../../services/spring-service";
import VideoData from './VideoData';
import Pagination from '../Pagination';

const VideoTable = () => {
    const [videos, setVideos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [videosPerPage] = useState(5);
    const [search, setSearch] = useState('');
    let history = useHistory();

    useEffect(() => {
        CourseService.getAllVideos()
            .then(res=>{
                setVideos(res.data);
                // setLoading(false);
            });
    },[]);
    const handleSearchChange = async(event)=>{
        setSearch(event.target.value)
        event.preventDefault();
    }
    const indexOfLastCourse = currentPage * videosPerPage;
    const indexOfFirstUser = indexOfLastCourse - videosPerPage;
    const currentVideos = videos.filter(video=>video.course.name.toLowerCase().includes(search.toLowerCase()) || video.url.toLowerCase().includes(search.toLowerCase())).slice(indexOfFirstUser, indexOfLastCourse);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return(
        <div>
            <div className="row">
                <h2 style={{flexGrow:"0.05"}}>Видео</h2>
                <button type='button' className="btn btn-primary w-25" style={{marginLeft:"12px"}} onClick={() => history.push('/adminactions/coursevideotable') }>
                    Добавить
                </button>
            </div>
            <form className="mt-3">
                <input class="form-control w-25" type="text" onChange={handleSearchChange} placeholder="Поиск..." aria-label="Search"/>
            </form>
            {videos.length >0?
            <>
            <VideoData videolist={currentVideos}></VideoData>
            <Pagination
                itemsPerPage={videosPerPage}
                totalItems={videos.length}
                paginate={paginate}
            />
            </>
            :
            <h3 className="mt-3 text-center">Никаких видео нет :(</h3>
            }
        </div>
    )
}

export default VideoTable;