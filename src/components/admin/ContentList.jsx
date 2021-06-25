import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const Sidebar = () => {
    let { path, url } = useRouteMatch();

    return(
        <div style={{
            width:"100%",
            borderRadius:"6px",
            backgroundColor:"#4FFFDB",
            opacity:"85%",
            
        }}>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link className="nav-link" to={`/adminpanel/courses`}>Курсы</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/adminpanel/videos'} className="nav-link">Видео</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/adminpanel/users'} className="nav-link">Пользователи</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={`/adminpanel/assignments`}>Задания</Link>
                </li>

            </ul>
        </div>
    )
}

export default Sidebar;