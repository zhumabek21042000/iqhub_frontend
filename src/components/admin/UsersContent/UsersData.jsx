import React,{useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import CourseService from "../../../services/spring-service";

const UsersData = ({userlist}) => {
    const [users, setUsers] = useState([]);
    let history = useHistory();

    useEffect(() => {
       setUsers(userlist);
    },[userlist]);

    return(
        
            
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Почта</th>
                        <th scope="col">Пароль</th>
                        <th scope="col">Имя пользователя</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.length>0 ? 
                    users.map((user) => {
                        return (
                            <tr>
                                <th scope="row">{user.id}</th>
                                <td>{user.email}</td>
                                {/* <td>{user.password}</td> */}
                                <td>Пароль зашифрован</td>
                                <td>{user.usersname? user.usersname : "No Username"}</td>
                                <td><Link to={`/adminactions/userpage/${user.id}`}>Детали</Link></td>
                                
                            </tr>
                        )
                    } )
                    :<h3>Ничего не найдено :(</h3>
                }
                    </tbody>
                
                
                </table>
            </div>
       
    )
}

export default UsersData;