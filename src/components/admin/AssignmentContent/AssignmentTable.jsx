import React,{useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import UploadService from "./UploadFilesService";
import AssignmentData from './AssignmentData';
import Pagination from '../Pagination';

const AssignmentTable = () => {
    const [files, setFiles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [fiesPerPage] = useState(5);
    const [search, setSearch] = useState('');
    let history = useHistory();

    useEffect(() => {
        setLoading(true);
        UploadService.getFiles()
            .then(res=>{
                setFiles(res.data);
                setLoading(false);
            });
    },[]);
    const handleSearchChange = async(event)=>{
        setSearch(event.target.value)
        event.preventDefault();
    }
    const indexOfLastCourse = currentPage * fiesPerPage;
    const indexOfFirstUser = indexOfLastCourse - fiesPerPage;
    const currentFiles = files.filter(file=>file.name.toLowerCase().includes(search.toLowerCase()) || file.course.name.toLowerCase().includes(search.toLowerCase())).slice(indexOfFirstUser, indexOfLastCourse);
    const paginate = pageNumber => setCurrentPage(pageNumber);
    return(
        <div>
            <div className="row">
                <h2 style={{flexGrow:"0.05"}}>Документы</h2>
                <button type='button' className="btn btn-primary w-25" style={{marginLeft:"12px"}} onClick={() => history.push('/adminactions/coursedoctable') }>
                    Добавить
                </button>
            </div>
            <form className="mt-3">
                <input class="form-control w-25" type="text" onChange={handleSearchChange} placeholder="Поиск..." aria-label="Search"/>
            </form>
            {files.length>0 ?
            <>
            <AssignmentData assignmentlist={currentFiles.reverse()} loading={loading}></AssignmentData>
            <Pagination
                itemsPerPage={fiesPerPage}
                totalItems={files.length}
                paginate={paginate}
            />
            </>
            :
            <h3 className="mt-3 text-center">Никаких документов нет :(</h3>
}
        </div>
    )
}

export default AssignmentTable;