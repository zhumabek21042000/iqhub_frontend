import React,{useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import CourseService from "../../../services/spring-service";
import UsersData from './UsersData';
import Pagination from '../Pagination';


const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);
    const [search, setSearch] = useState('');
    let history = useHistory();

    useEffect(() => {
        setLoading(true);
        CourseService.getAllUsers()
            .then(res=>{
                setUsers(res.data);
                setLoading(false);
            });
    },[]);
    const handleSearchChange = async(event)=>{
        setSearch(event.target.value)
        event.preventDefault();
    }
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.filter(user=> user.email.toLowerCase().includes(search.toLowerCase()) || user.usersname.toLowerCase().includes(search.toLowerCase())).slice(indexOfFirstUser, indexOfLastUser);
  
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    return(
        <div>
            <div className="row">
                <h2 style={{flexGrow:"0.05"}}>Пользователи</h2>
                <button type='button' className="btn btn-primary w-25" style={{marginLeft:"12px"}} onClick={() => history.push('/adminactions/adduser') }>
                    Добавить
                </button>
            </div>
            <form className="mt-3">
                <input class="form-control w-25" type="text" onChange={handleSearchChange} placeholder="Поиск..." aria-label="Search"/>
            </form>
            {
            !loading ? 
            users.length >0?
            <>
            <UsersData userlist={currentUsers.reverse()}></UsersData>
            <Pagination
                itemsPerPage={usersPerPage}
                totalItems={users.length}
                paginate={paginate}
            />
            </>
            :
            <h3 className="mt-3 text-center">Никаких пользователей нет :(</h3>
            :
            CourseService.loadingGif()
            }
        </div>
    )
}

export default UsersTable;